import { toast } from 'sonner';
import { deleteTask } from '@/lib/http/task/delete';
import type { TaskData } from '@/lib/http/types/task';
import { useEffect, useMemo, useRef, useState } from 'react';
import { type FilterField, filterTasks } from './filter-tasks';
import { type SortDirection, type SortField, sortTasks } from './sort-tasks';

export type SortState = { field: SortField; direction: SortDirection };

export function useTasksOverview(initialData: TaskData[]) {
  const [taskData, setTaskData] = useState(initialData);
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

  const tasks = useMemo(() => {
    const filtered = filterTasks(filterFieldState, taskData);

    const searched = searchTerm
      ? filtered.filter(task =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : filtered;

    return sortState
      ? sortTasks(sortState.field, sortState.direction, searched)
      : searched;
  }, [taskData, filterFieldState, searchTerm, sortState]);

  const onTaskEdit = (newData: TaskData) => {
    setTaskData(prev =>
      prev.map(task => (task.id === newData.id ? newData : task)),
    );
  };

  const onTaskDelete = async (taskId: number) => {
    const response = await deleteTask(taskId);

    if (!response.success) {
      toast.error(
        `We can't complete your request due to an internal server error. HTTP CODE: ${response.status}`,
      );
      return;
    }

    setTaskData(prev => prev.filter(task => task.id !== taskId));
  };

  return {
    tasks,
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
    onTaskEdit,
    onTaskDelete,
  };
}
