import { compareAsc, parseISO } from 'date-fns';
import type { ProjectData } from '@/lib/http/types/project';
import type { SortDirection, SortField } from './sort-button';

function sortProjects(
  field: SortField,
  direction: SortDirection,
  projects: ProjectData[],
) {
  switch (field) {
    case 'created':
      return projects.toSorted((a, b) => {
        const result = compareAsc(
          parseISO(a.created_at),
          parseISO(b.created_at),
        );

        return direction === 'asc' ? result : -result;
      });

    case 'updated': {
      return projects.toSorted((a, b) => {
        const result = compareAsc(
          parseISO(a.updated_at),
          parseISO(b.updated_at),
        );

        return direction === 'asc' ? result : -result;
      });
    }

    case 'favorites': {
      return projects.toSorted((a, b) => {
        const favoriteDiff = Number(a.is_favorite) - Number(b.is_favorite);

        return direction === 'asc' ? favoriteDiff : -favoriteDiff;
      });
    }

    default:
      return projects;
  }
}

export { sortProjects };
