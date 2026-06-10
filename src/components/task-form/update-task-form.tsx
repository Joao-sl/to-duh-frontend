'use client';

import { type TaskData } from '@/lib/http/types/task';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { updateTaskAction } from '@/app/actions/task/update-task';
import { TaskFormFields } from './task-form-fields';
import {
  updateTaskSchema,
  type UpdateTaskSchema,
} from '@/validations/schemas/tasks';
import { useEffect } from 'react';
import { FormActions } from '../form-actions';

type UpdateTaskFormProps = {
  taskId: number;
  initialValues: TaskData;
  onSuccess?: (data: TaskData) => void;
  onCancel?: (formIsDirty: boolean) => void;
  submissionMode?: 'server-action' | 'route-handler';
};

function UpdateTaskForm({
  taskId,
  initialValues,
  onSuccess,
  onCancel,
  submissionMode = 'server-action',
}: UpdateTaskFormProps) {
  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      title: initialValues.title,
      description: initialValues.description,
      priority: initialValues.priority ?? undefined,
      due_at: initialValues.due_at ?? undefined,
    },
    mode: 'onSubmit',
  });

  const { formState, reset, setError, getValues, handleSubmit, setFocus } =
    form;

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  async function onSubmit() {
    let response;
    const data = getValues(undefined, { dirtyFields: true });

    if (Object.keys(data).length === 0) {
      return;
    }

    if (submissionMode === 'server-action') {
      response = await updateTaskAction(taskId, data);
    } else {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      response = await res.json();
    }

    if (!response.success) {
      handleApiErrors(response, setError, updateTaskSchema);
      return;
    }

    if (onSuccess) {
      onSuccess(response);
    }
  }

  function handleOnCancel() {
    if (onCancel) {
      return onCancel(formState.isDirty);
    }

    return reset();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <TaskFormFields />

        <FormActions
          isSubmitting={formState.isSubmitting}
          isDirty={formState.isDirty}
          onCancel={handleOnCancel}
          submitButtonText='Update'
        />
      </form>
    </FormProvider>
  );
}

export { UpdateTaskForm };
