'use client';

import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { type TaskData } from '@/lib/http/types/task';
import { useBoardContext } from '@/contexts/board-context';
import { CreateTaskForm } from '@/components/task-form/create-task-form';

type AddTaskProps = {
  projectId: number;
  buttonLabel?: string;
  defaultSection?: number;
  onSuccess: (data: TaskData) => void;
  isOpened?: (status: boolean) => void;
};

function AddTaskButton({
  projectId,
  buttonLabel = 'Add Task',
  defaultSection,
  onSuccess,
  isOpened,
}: AddTaskProps) {
  const { board } = useBoardContext();
  const [open, setOpen] = useState(false);

  return open ? (
    <div className='transition-all duration-400 starting:opacity-0 w-full'>
      <CreateTaskForm
        projectId={projectId}
        sections={board.sections}
        onCancel={() => {
          setOpen(false);
          isOpened?.(false);
        }}
        onSuccess={data => {
          setOpen(false);
          onSuccess(data);
        }}
        submissionMode='route-handler'
        defaultSection={defaultSection}
      />
    </div>
  ) : (
    <Button
      size='sm'
      variant='link'
      className='text-xs'
      onClick={() => {
        setOpen(true);
        isOpened?.(true);
      }}
      aria-label='Add new task'
    >
      <IconPlus aria-hidden /> {buttonLabel}
    </Button>
  );
}

export { AddTaskButton };
