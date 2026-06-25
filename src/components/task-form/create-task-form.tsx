'use client';

import { type TaskData } from '@/lib/http/types/task';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { createTaskAction } from '@/app/actions/task/create-task';
import {
  TaskFormFields,
  type TaskFormFieldsSections,
} from './task-form-fields';
import {
  createTaskSchema,
  type CreateTaskSchema,
} from '@/validations/schemas/tasks';
import { useEffect } from 'react';
import { FormActions } from '../form-actions';

type CreateTaskFormProps = {
  projectId: number;
  sections: TaskFormFieldsSections[];
  defaultSection?: number;
  onCancel?: () => void;
  onSuccess?: (data: TaskData) => void;
  submissionMode?: 'server-action' | 'route-handler';
};

function CreateTaskForm({
  projectId,
  sections,
  onCancel,
  onSuccess,
  submissionMode = 'server-action',
  defaultSection,
}: CreateTaskFormProps) {
  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      project_id: projectId,
      section_id: defaultSection,
      title: '',
      description: '',
      due_at: undefined,
      priority: undefined,
    },
    mode: 'onSubmit',
  });

  const { formState, reset, setError, handleSubmit, setFocus } = form;

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  async function onSubmit(data: CreateTaskSchema) {
    let response;

    if (submissionMode === 'server-action') {
      response = await createTaskAction(data);
    } else {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      response = await res.json();
    }

    if (!response.success) {
      handleApiErrors(response, setError, createTaskSchema);
      return;
    }

    if (onSuccess) {
      onSuccess(response);
    }

    reset();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <TaskFormFields sections={sections} />

        <FormActions
          isSubmitting={formState.isSubmitting}
          isDirty={formState.isDirty}
          onCancel={onCancel ?? (() => reset())}
        />
      </form>
    </FormProvider>
  );
}

export { CreateTaskForm };
