'use client';

import type { ProjectData } from '@/lib/http/types/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ProjectFormFields } from './project-form-fields';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { createProjectAction } from '@/app/actions/project/create-project';
import {
  createProjectSchema,
  type CreateProjectSchema,
} from '@/validations/schemas/projects';
import { useEffect } from 'react';
import { FormActions } from '../form-actions';

type CreateProjectFormProps = {
  onCancel?: () => void;
  onSuccess?: (data: ProjectData) => void;
  submissionMode?: 'server-action' | 'route-handler';
};

function CreateProjectForm({
  submissionMode = 'server-action',
  onCancel,
  onSuccess,
}: CreateProjectFormProps) {
  const form = useForm<CreateProjectSchema>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      is_favorite: false,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { formState, reset, setError, handleSubmit, setFocus } = form;

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  async function onSubmit(data: CreateProjectSchema) {
    let response;

    if (submissionMode === 'server-action') {
      response = await createProjectAction(data);
    } else {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      response = await res.json();
    }

    if (!response.success) {
      handleApiErrors(response, setError, createProjectSchema);
      return;
    }

    if (onSuccess) {
      const { success, ...rest } = response;
      void success;
      onSuccess(rest);
    }

    reset();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <ProjectFormFields />

        <FormActions
          isSubmitting={formState.isSubmitting}
          isDirty={formState.isDirty}
          onCancel={onCancel ?? (() => reset())}
        />
      </form>
    </FormProvider>
  );
}

export { CreateProjectForm };
