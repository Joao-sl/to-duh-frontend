import type { ProjectData } from '@/lib/http/types/project';
import type { ProjectFilterFields } from './filter-button';

function filterProjects(
  field: ProjectFilterFields,
  initialData: ProjectData[],
) {
  return () => {
    switch (field) {
      case 'all':
        return initialData;

      case 'favorites':
        const filtered = initialData.filter(proj => proj.is_favorite === true);
        return filtered;

      default:
        return initialData;
    }
  };
}

export { filterProjects };
