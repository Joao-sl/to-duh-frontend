'use client';

import { cn } from '@/utils/cn';
import { useState } from 'react';
import { format } from 'date-fns';
import type { TaskData } from '@/lib/http/types/task';
import { UpdateTaskForm } from '../task-form/update-task-form';
import { TaskActions } from '../project-details/content/task/task-actions';

type TaskItemProps = {
  task: TaskData;
  onEditSuccess: (task: TaskData) => void;
  onDelete: () => void;
};

function TaskItem({ task, onEditSuccess, onDelete }: TaskItemProps) {
  const [open, setOpen] = useState(false);

  const description = !task.description ? 'No description' : task.description;
  const dateFormat = 'dd MMMM yyyy';

  const formattedDueAt = task.due_at
    ? `Due at: ${format(task.due_at, dateFormat)}`
    : undefined;

  const formattedCompletedAt = task.completed_at
    ? `Completed at: ${format(task.completed_at, dateFormat)}`
    : undefined;

  const textToCopy = [
    task.title,
    task.description,
    formattedDueAt,
    task.priority,
    formattedCompletedAt,
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div
      className={cn({
        'relative hover:bg-accent/20 rounded-2xl overflow-hidden py-4.5 px-4':
          !open,
      })}
    >
      {open ? (
        <div className='mb-2'>
          <UpdateTaskForm
            submissionMode='route-handler'
            taskId={task.id}
            initialValues={task}
            onSuccess={data => {
              onEditSuccess(data);
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
          />
        </div>
      ) : (
        <>
          <div className='flex-1'>
            <h2
              title={task.title}
              className='text-[15px] font-semibold line-clamp-1'
            >
              {task.title}
            </h2>

            <p
              title={task.description}
              className={cn('text-muted-foreground line-clamp-1 text-[13px]', {
                italic: !task.description,
              })}
            >
              {description}
            </p>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 items-center justify-between text-muted-foreground text-[12.5px] mt-2'>
            <time dateTime={task.created_at}>
              Created at {format(task.created_at, dateFormat)}
            </time>

            {task.due_at && !task.is_completed && (
              <time dateTime={task.due_at}>
                Due at {format(task.due_at, dateFormat)}
              </time>
            )}

            {task.completed_at && (
              <p>Completed at {format(task.completed_at, dateFormat)}</p>
            )}

            {task.priority && !task.is_completed && (
              <p>
                <span className='capitalize'>{task.priority}</span> priority
              </p>
            )}
          </div>

          <div className='absolute right-0 bottom-3'>
            <TaskActions
              onCopy={() => {
                navigator.clipboard.writeText(textToCopy);
              }}
              onDelete={onDelete}
              openEditForm={() => setOpen(true)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export { TaskItem };
