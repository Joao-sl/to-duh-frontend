'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProjectFormFields } from './project-form-fields';
import { ProjectData } from '@/lib/http/get-projects';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { updateProjectAction } from '@/app/actions/project/update-project';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import {
  UpdateProjectSchema,
  updateProjectSchema,
} from '@/validations/schemas/projects';

type UpdateProjectFormProps = {
  projectId: number;
  initialValues: ProjectData;
  onSuccess?: (data: ProjectData) => void;
  onCancel?: () => void;
  submissionMode?: 'server-action' | 'route-handler';
};

function UpdateProjectForm({
  projectId,
  initialValues,
  onSuccess,
  onCancel,
  submissionMode = 'server-action',
}: UpdateProjectFormProps) {
  const form = useForm<UpdateProjectSchema>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: initialValues.name,
      description: initialValues.description,
      is_favorite: initialValues.is_favorite,
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
      response = await updateProjectAction(projectId, data);
    } else {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      response = await res.json();
    }

    if (!response.success) {
      handleApiErrors(response, setError, updateProjectSchema);
      return;
    }

    if (onSuccess) {
      const { success, ...rest } = response;
      void success;
      onSuccess(rest);
    }

    return data;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ProjectFormFields hideLabels />

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
            {formState.isSubmitting ? <Spinner /> : 'Update'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export { UpdateProjectForm };
