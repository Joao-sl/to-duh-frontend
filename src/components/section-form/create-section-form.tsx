import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
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

  const { formState, reset, setError, handleSubmit } = form;

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

        <div className='flex justify-end gap-2 mt-2'>
          <Button
            type='button'
            size='sm'
            variant='secondary'
            disabled={formState.isSubmitting}
            aria-disabled={formState.isSubmitting}
            onClick={onCancel ?? (() => reset())}
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
            {formState.isSubmitting ? <Spinner /> : 'Create'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export { CreateSectionForm };
