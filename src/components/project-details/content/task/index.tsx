'use client';

import { useState } from 'react';
import { TaskCard } from './task-card';
import { TaskActions } from './task-actions';
import { TaskData } from '@/lib/http/types/task';
import { useTaskActions } from './use-task-actions';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { UpdateTaskForm } from '@/components/task-form/update-task-form';
import { format } from 'date-fns';

type TaskItemProps = {
  task: TaskData;
};

function TaskItem({ task }: TaskItemProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [checked, setChecked] = useState(task.is_completed);
  const { handleTaskToggle, handleTaskDelete, handleTaskUpdated } =
    useTaskActions();

  if (!task) {
    return null;
  }

  const formattedDueAt = task.due_at
    ? `Due at: ${format(task.due_at, 'dd-MM-yy')}`
    : undefined;

  const formattedCompletedAt = task.completed_at
    ? `Completed at: ${format(task.completed_at, 'dd-MM-yy')}`
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

  async function handleChange(state: boolean) {
    if (isSaving) return;
    const previousState = checked;

    setChecked(state);
    setIsSaving(true);

    const success = await handleTaskToggle(state, task.id);

    setChecked(success ? state : previousState);
    setIsSaving(false);
  }

  function handleOnSuccess(data: TaskData) {
    handleTaskUpdated(data);
    setShowEditForm(false);
  }

  function handleOnCancel(formIsDirty: boolean) {
    if (formIsDirty) {
      return setShowDialog(true);
    }
    setShowEditForm(false);
  }

  function handleUpdateFormKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setShowEditForm(false);
    }
  }

  return (
    <li className='my-1'>
      <ConfirmDialog
        title='Discard changes?'
        description="This can't be undone and you'll lose your draft."
        confirmLabel='Discard'
        open={showDialog}
        onOpenChange={setShowDialog}
        onConfirm={() => {
          setShowEditForm(false);
          setShowDialog(false);
        }}
      />

      {showEditForm ? (
        <div onKeyDown={handleUpdateFormKeyDown} className='p-1'>
          <UpdateTaskForm
            submissionMode='route-handler'
            taskId={task.id}
            initialValues={task}
            onSuccess={handleOnSuccess}
            onCancel={handleOnCancel}
          />
        </div>
      ) : (
        <article className='flex justify-between group bg-rd-500 border-b border-border py-4'>
          <TaskCard
            task={task}
            checked={checked}
            isSaving={isSaving}
            onCheckedChange={handleChange}
            onEditClick={() => setShowEditForm(true)}
          />

          <TaskActions
            openEditForm={() => setShowEditForm(true)}
            onDelete={() => handleTaskDelete(task.id, task.section_id)}
            onCopy={() => navigator.clipboard.writeText(textToCopy)}
          />
        </article>
      )}
    </li>
  );
}

export { TaskItem };
