'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SectionData } from '@/lib/http/types/section';
import { FormProvider, useForm } from 'react-hook-form';
import { SectionFormFields } from './section-form-fields';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { createSectionAction } from '@/app/actions/section/create-section';
import {
  type CreateSectionSchema,
  createSectionSchema,
} from '@/validations/schemas/sections';
import { useEffect } from 'react';
import { FormActions } from '../form-actions';

type CreateProjectFormProps = {
  projectId: number;
  onCancel?: () => void;
  onSuccess?: (data: SectionData) => void;
  submissionMode?: 'server-action' | 'route-handler';
};

function CreateSectionForm({
  projectId,
  submissionMode = 'server-action',
  onCancel,
  onSuccess,
}: CreateProjectFormProps) {
  const form = useForm<CreateSectionSchema>({
    resolver: zodResolver(createSectionSchema),
    defaultValues: {
      project_id: projectId,
      name: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { formState, reset, setError, handleSubmit, setFocus } = form;

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  async function onSubmit(data: CreateSectionSchema) {
    let response;

    if (submissionMode === 'server-action') {
      response = await createSectionAction(data);
    } else {
      const res = await fetch('/api/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      response = await res.json();
    }

    if (!response.success) {
      handleApiErrors(response, setError, createSectionSchema);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionFormFields hideLabels />

        <FormActions
          isSubmitting={formState.isSubmitting}
          isDirty={formState.isDirty}
          onCancel={onCancel ?? (() => reset())}
        />
      </form>
    </FormProvider>
  );
}

export { CreateSectionForm };
