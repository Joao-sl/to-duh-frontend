import { compareAsc, parseISO } from 'date-fns';
import type { TaskData } from '@/lib/http/types/task';

export type SortDirection = 'asc' | 'desc';
export type SortField = 'created' | 'updated' | 'dueAt' | 'completedAt';

function sortTasks(
  field: SortField,
  direction: SortDirection,
  tasks: TaskData[],
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

    case 'dueAt': {
      return tasks.toSorted((a, b) => {
        if (!a.due_at && !b.due_at) return 0;
        if (!a.due_at) return 1; // null go to the end
        if (!b.due_at) return -1;

        const result = compareAsc(parseISO(a.due_at), parseISO(b.due_at));

        return direction === 'asc' ? result : -result;
      });
    }

    case 'completedAt': {
      return tasks.toSorted((a, b) => {
        if (!a.completed_at && !b.completed_at) return 0;
        if (!a.completed_at) return 1; // null go to the end
        if (!b.completed_at) return -1;

        const result = compareAsc(
          parseISO(a.completed_at),
          parseISO(b.completed_at),
        );

        return direction === 'asc' ? result : -result;
      });
    }

    default:
      return tasks;
  }
}

export { sortTasks };
