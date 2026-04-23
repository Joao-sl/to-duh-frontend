'use client';

import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
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

type CreateTaskFormProps = {
  projectId: number;
  sections: TaskFormFieldsSections[];
  onCancel?: () => void;
  onSuccess?: (data: TaskData) => void;
};

function CreateTaskForm({
  projectId,
  sections,
  onCancel,
  onSuccess,
}: CreateTaskFormProps) {
  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      project_id: projectId,
      section_id: undefined,
      title: '',
      description: '',
      due_at: undefined,
      priority: undefined,
    },
    mode: 'onSubmit',
  });
  const { formState, reset, setError, handleSubmit } = form;

  async function onSubmit(data: CreateTaskSchema) {
    const response = await createTaskAction(data);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TaskFormFields sections={sections} />

        <div className='flex justify-end gap-2'>
          <Button
            type='button'
            size='sm'
            variant='secondary'
            disabled={formState.isSubmitting}
            aria-disabled={formState.isSubmitting}
            onClick={onCancel ?? (() => reset())}
          >
            {formState.isSubmitting ? <Spinner /> : 'Cancel'}
          </Button>

          <Button
            size='sm'
            type='submit'
            disabled={formState.isSubmitting || !formState.isDirty}
            aria-disabled={formState.isSubmitting}
            className='w-17.25'
          >
            {formState.isSubmitting ? <Spinner /> : 'Create'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export { CreateTaskForm };
