'use client';

import { cn } from '@/utils/cn';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { type TaskData } from '@/lib/http/types/task';
import {
  IconAlarmFilled,
  IconChecks,
  IconSquareRoundedFilled,
} from '@tabler/icons-react';

type TaskCardProps = {
  task: TaskData;
  checked: boolean;
  isSaving: boolean;
  onCheckedChange: (state: boolean) => void;
  onEditClick: () => void;
};

function TaskCard({
  task,
  checked,
  isSaving,
  onCheckedChange,
  onEditClick,
}: TaskCardProps) {
  const mustHaveFooter = !!(task.priority || task.due_at || task.is_completed);

  const formattedDueAt = task.due_at
    ? format(task.due_at, 'dd-MM-yy')
    : undefined;

  const formattedCompletedAt = task.completed_at
    ? format(task.completed_at, 'dd-MM-yy')
    : undefined;

  const isCompletedClasses = {
    'text-muted-foreground! line-through!': task.is_completed,
  };

  const isCompletedTitle = [formattedDueAt, task.priority]
    .filter(Boolean)
    .join('\n');

  const priorityColorMap = {
    'fill-muted-foreground': task.priority === null,
    'fill-low-priority': task.priority === 'low',
    'fill-medium-priority': task.priority === 'medium',
    'fill-high-priority': task.priority === 'high',
  };

  const iconSize = 18;

  return (
    <div className='flex gap-3'>
      <label htmlFor={`task-${task.id}-status`} className='sr-only'>
        Task Status
      </label>

      <Checkbox
        id={`task-${task.id}-status`}
        name='is_completed'
        checked={checked}
        disabled={isSaving}
        onCheckedChange={onCheckedChange}
        className='mt-1'
      />

      <div onClick={onEditClick} className='space-y-1.5'>
        <header title={task.is_completed ? task.title : undefined}>
          <h3 className={cn('text-sm', isCompletedClasses)}>{task.title}</h3>
        </header>

        {task.description && (
          <p
            title={task.is_completed ? task.description : undefined}
            className={cn(
              'text-[13px] text-muted-foreground',
              isCompletedClasses,
            )}
          >
            {task.description}
          </p>
        )}

        {mustHaveFooter && (
          <footer className='text-xs'>
            <dl className='flex gap-8 text-muted-foreground font-medium'>
              {task.due_at && !task.completed_at && (
                <div>
                  <dt className='sr-only'>Due at</dt>
                  <dd
                    className={cn(
                      'flex items-center gap-1 ',
                      isCompletedClasses,
                    )}
                  >
                    <IconAlarmFilled
                      size={iconSize}
                      aria-hidden
                      className='fill-muted-foreground/70'
                    />
                    {formattedDueAt}
                  </dd>
                </div>
              )}

              {task.priority && !task.completed_at && (
                <div>
                  <dt className='sr-only'>Priority</dt>
                  <dd
                    className={cn(
                      'capitalize flex items-center gap-1',
                      isCompletedClasses,
                    )}
                  >
                    <IconSquareRoundedFilled
                      size={iconSize}
                      aria-hidden
                      className={cn(priorityColorMap)}
                    />
                    {task.priority}
                  </dd>
                </div>
              )}

              {task.is_completed && (
                <div title={isCompletedTitle ?? undefined}>
                  <dt className='sr-only'>Completed at</dt>
                  <dd className='flex items-center gap-1'>
                    <IconChecks size={iconSize} />
                    {formattedCompletedAt}
                  </dd>
                </div>
              )}
            </dl>
          </footer>
        )}
      </div>
    </div>
  );
}

export { TaskCard };
