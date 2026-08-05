import type { TaskData } from '@/lib/http/types/task';

type Priority = NonNullable<TaskData['priority']>;
export type FilterField = 'all' | 'completed' | Priority;

function filterTasks(field: FilterField, initialData: TaskData[]) {
  switch (field) {
    case 'all':
      return initialData;

    case 'completed': {
      const filtered = initialData.filter(task => task.is_completed === true);
      return filtered;
    }

    case 'low':
    case 'medium':
    case 'high': {
      const filtered = initialData.filter(proj => proj.priority === field);
      return filtered;
    }

    default:
      return initialData;
  }
}

export { filterTasks };
