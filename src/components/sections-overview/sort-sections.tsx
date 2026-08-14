import { compareAsc, parseISO } from 'date-fns';
import type { SectionData } from '@/lib/http/types/section';

export type SortDirection = 'asc' | 'desc';
export type SortField = 'created' | 'updated';

function sortSections(
  field: SortField,
  direction: SortDirection,
  tasks: SectionData[],
) {
  switch (field) {
    case 'created': {
      return tasks.toSorted((a, b) => {
        const result = compareAsc(
          parseISO(a.created_at),
          parseISO(b.created_at),
        );

        return direction === 'asc' ? result : -result;
      });
    }

    case 'updated': {
      return tasks.toSorted((a, b) => {
        const result = compareAsc(
          parseISO(a.updated_at),
          parseISO(b.updated_at),
        );

        return direction === 'asc' ? result : -result;
      });
    }

    default:
      return tasks;
  }
}

export { sortSections };
