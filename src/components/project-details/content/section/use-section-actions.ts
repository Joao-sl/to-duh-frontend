import { toast } from 'sonner';
import { SectionData } from '@/lib/http/types/section';
import { patchSection } from '@/lib/http/section/patch';
import { deleteSection } from '@/lib/http/section/delete';
import { useBoardContext } from '@/contexts/board-context';

function useSectionActions() {
  const { dispatch } = useBoardContext();

  function handleSectionCreated(data: SectionData) {
    dispatch({ type: 'SECTION_CREATED', payload: data });
  }

  function handleSectionUpdated(data: SectionData) {
    dispatch({ type: 'SECTION_UPDATED', payload: data });
  }

  async function handleSectionArchived(id: number) {
    dispatch({ type: 'SECTION_ARCHIVED', payload: { id } });
    const response = await patchSection(id, { is_archived: true });

    if (!response.success) {
      return toast.error(
        `We can't complete your request due to an internal server error. HTTP CODE: ${response.status}`,
      );
    }
  }

  async function handleSectionDeleted(id: number) {
    dispatch({ type: 'SECTION_DELETED', payload: { id } });
    const response = await deleteSection(id);

    if (!response.success) {
      return toast.error(
        `We can't complete your request due to an internal server error. HTTP CODE: ${response.status}`,
      );
    }
  }

  return {
    handleSectionCreated,
    handleSectionUpdated,
    handleSectionArchived,
    handleSectionDeleted,
  };
}

export { useSectionActions };
