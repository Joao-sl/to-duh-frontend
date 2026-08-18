import { toast } from 'sonner';
import { patchSection } from '@/lib/http/section/patch';
import { deleteSection } from '@/lib/http/section/delete';
import type { SectionData } from '@/lib/http/types/section';
import { useEffect, useMemo, useRef, useState } from 'react';
import { UpdateSectionSchema } from '@/validations/schemas/sections';
import {
  sortSections,
  type SortDirection,
  type SortField,
} from './sort-sections';

export type SortState = { field: SortField; direction: SortDirection };

export function useSectionsOverview(initialData: SectionData[]) {
  const [sectionsData, setSectionsData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortState, setSortState] = useState<SortState>({
    field: 'created',
    direction: 'desc',
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const focusSearch = () => searchInputRef.current?.focus();

  const toastError = (status: number) =>
    toast.error(
      `We can't complete your request due to an internal server error. HTTP CODE: ${status}`,
    );

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        focusSearch();
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const sections = useMemo(() => {
    const searched = sectionsData.filter(section =>
      section.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return sortState
      ? sortSections(sortState.field, sortState.direction, searched)
      : searched;
  }, [searchTerm, sortState, sectionsData]);

  const onSectionEdit = (newData: SectionData) => {
    setSectionsData(prev =>
      prev.map(section => (section.id === newData.id ? newData : section)),
    );
  };

  const onSectionDelete = async (sectionId: number) => {
    const response = await deleteSection(sectionId);

    if (!response.success) {
      return toastError(response.status);
    }

    setSectionsData(prev => prev.filter(section => section.id !== sectionId));
  };

  const onSectionArchive = async (
    sectionId: number,
    data: UpdateSectionSchema,
  ) => {
    const response = await patchSection(sectionId, data);

    if (!response.success) {
      return toastError(response.status);
    }

    setSectionsData(prev => prev.filter(section => section.id !== sectionId));
  };

  return {
    sections,
    searchTerm,
    searchInputRef,
    sortState,
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearchTerm(event.target.value),
    clearSearch: () => {
      setSearchTerm('');
      focusSearch();
    },
    onSort: (field: SortField, direction: SortDirection) =>
      setSortState({ field, direction }),
    onSectionEdit,
    onSectionArchive,
    onSectionDelete,
  };
}
