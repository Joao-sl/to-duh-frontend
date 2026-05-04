import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { ProjectData } from '@/lib/http/get-projects';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { ProjectFormFields } from './project-form-fields';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { createProjectAction } from '@/app/actions/project/create-project';
import {
  createProjectSchema,
  CreateProjectSchema,
} from '@/validations/schemas/projects';

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

  const { formState, reset, setError, handleSubmit } = form;

  async function onSubmit(data: CreateProjectSchema) {
    let response;

    if (submissionMode === 'server-action') {
      response = await createProjectAction(data);
    } else {
      const res = await fetch('/api/projects', {
        method: 'POST',
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProjectFormFields />

        <div className='flex justify-end gap-2'>
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

export { CreateProjectForm };
