'use client';

import { TaskItem } from './task-item';
import { SortButton } from './sort-button';
import { Container } from '../ui/container';
import { SearchHeader } from './search-header';
import { FilterButton } from './filter-button';
import type { TaskData } from '@/lib/http/types/task';
import { useTasksOverview } from './use-tasks-overview';

type TasksOverviewProps = {
  initialData: TaskData[];
};

function TasksOverview({ initialData }: TasksOverviewProps) {
  const {
    tasks,
    searchTerm,
    clearSearch,
    onSearchChange,
    searchInputRef,
    onSort,
    sortState,
    onFilter,
    filterFieldState,
    onTaskEdit,
    onTaskDelete,
  } = useTasksOverview(initialData);

  return (
    <Container asChild>
      <section>
        <SearchHeader
          searchTerm={searchTerm}
          onClearSearch={clearSearch}
          onSearchChange={onSearchChange}
          searchInputRef={searchInputRef}
        />

        <div className='flex items-center justify-between'>
          <div className='space-x-1'>
            <FilterButton
              selectedFilter={filterFieldState}
              onFilter={onFilter}
            />
            <SortButton sort={sortState} onSort={onSort} />
          </div>

          <p className='text-muted-foreground text-sm font-medium'>
            {tasks.length} Total
          </p>
        </div>

        <ul>
          {tasks.map(task => (
            <li key={task.id} className='group'>
              <TaskItem
                task={task}
                onEditSuccess={onTaskEdit}
                onDelete={() => onTaskDelete(task.id)}
              />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

export { TasksOverview };
