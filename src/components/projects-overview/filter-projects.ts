import type { ProjectData } from '@/lib/http/types/project';
import type { FilterField } from './filter-button';

function filterProjects(field: FilterField, initialData: ProjectData[]) {
  switch (field) {
    case 'all':
      return initialData;

    case 'favorites':
      const filtered = initialData.filter(proj => proj.is_favorite === true);
      return filtered;

    default:
      return initialData;
  }
}

export { filterProjects };
