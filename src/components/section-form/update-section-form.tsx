'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SectionData } from '@/lib/http/types/section';
import { FormProvider, useForm } from 'react-hook-form';
import { SectionFormFields } from './section-form-fields';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { updateSectionAction } from '@/app/actions/section/update-section';
import {
  type UpdateSectionSchema,
  updateSectionSchema,
} from '@/validations/schemas/sections';
import { useEffect } from 'react';
import { FormActions } from '../form-actions';

type UpdateProjectFormProps = {
  initialValues: Pick<SectionData, 'id' | 'name'>;
  onSuccess?: (data: SectionData) => void;
  onCancel?: (formIsDirty: boolean) => void;
  submissionMode?: 'server-action' | 'route-handler';
};

function UpdateSectionForm({
  initialValues,
  onSuccess,
  onCancel,
  submissionMode = 'server-action',
}: UpdateProjectFormProps) {
  const form = useForm<UpdateSectionSchema>({
    resolver: zodResolver(updateSectionSchema),
    defaultValues: {
      name: initialValues.name,
    },
    mode: 'onSubmit',
  });

  const { formState, reset, setError, getValues, handleSubmit, setFocus } =
    form;

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  async function onSubmit() {
    let response;
    const data = getValues(undefined, { dirtyFields: true });

    if (Object.keys(data).length === 0) {
      return;
    }

    if (submissionMode === 'server-action') {
      response = await updateSectionAction(initialValues.id, data);
    } else {
      const res = await fetch(`/api/sections/${initialValues.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      response = await res.json();
    }

    if (!response.success) {
      handleApiErrors(response, setError, updateSectionSchema);
      return;
    }

    if (onSuccess) {
      const { success, ...rest } = response;
      void success;
      onSuccess(rest);
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
        <SectionFormFields hideLabels />

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

export { UpdateSectionForm };
