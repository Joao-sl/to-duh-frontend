'use client';

import { TaskItem } from '.';
import { type TaskData } from '@/lib/http/types/task';

type UnsectionedTasksProps = {
  tasks: TaskData[];
};

function UnsectionedTasks({ tasks }: UnsectionedTasksProps) {
  return (
    <section>
      <h2 className='sr-only'>Unsectioned Tasks</h2>
      <ul>
        {tasks.map(task => (
          <TaskItem key={`${task.title}-${task.id}`} task={task} />
        ))}
      </ul>
    </section>
  );
}

export { UnsectionedTasks };
