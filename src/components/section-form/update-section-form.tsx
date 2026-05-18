'use client';

import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
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

  const { formState, reset, setError, getValues, handleSubmit } = form;

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionFormFields hideLabels />

        <div className='flex justify-end gap-2 mt-2'>
          <Button
            type='button'
            size='sm'
            variant='secondary'
            disabled={formState.isSubmitting}
            aria-disabled={formState.isSubmitting}
            onClick={handleOnCancel}
          >
            Cancel
          </Button>

          <Button
            size='sm'
            type='submit'
            disabled={formState.isSubmitting || !formState.isDirty}
            aria-disabled={formState.isSubmitting}
            className='w-17.25'
          >
            {formState.isSubmitting ? <Spinner /> : 'Update'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export { UpdateSectionForm };
