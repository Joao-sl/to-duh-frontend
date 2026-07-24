import { useEffect, useMemo, useRef, useState } from 'react';
import { SortDirection, SortField } from './sort-button';
import { ProjectData } from '@/lib/http/types/project';
import { filterProjects } from './filter-projects';
import { sortProjects } from './sort-projects';
import { FilterField } from './filter-button';

export type SortState = { field: SortField; direction: SortDirection };

export function useProjectsOverview(initialData: ProjectData[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFieldState, setFilterFieldState] = useState<FilterField>('all');
  const [sortState, setSortState] = useState<SortState>({
    field: 'created',
    direction: 'desc',
  });

  const searchInputRef = useRef<HTMLInputElement>(null);
  const focusSearch = () => searchInputRef.current?.focus();

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

  const projects = useMemo(() => {
    const filtered = filterProjects(filterFieldState, initialData);

    const searched = searchTerm
      ? filtered.filter(project =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : filtered;

    return sortState
      ? sortProjects(sortState.field, sortState.direction, searched)
      : searched;
  }, [initialData, filterFieldState, searchTerm, sortState]);

  return {
    projects,
    searchTerm,
    searchInputRef,
    filterFieldState,
    sortState,
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearchTerm(event.target.value),
    clearSearch: () => {
      setSearchTerm('');
      focusSearch();
    },
    onFilter: setFilterFieldState,
    onSort: (field: SortField, direction: SortDirection) =>
      setSortState({ field, direction }),
  };
}
