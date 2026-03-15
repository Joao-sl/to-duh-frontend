'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { TabsContent } from '@/components/ui/tabs';
import { IconSignature } from '@tabler/icons-react';
import { DialogClose } from '@/components/ui/dialog';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { useUserContext } from '@/contexts/user-context';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { updateCurrentUserNameAction } from '@/app/actions/user/update-current-user-name';
import {
  UpdateUserNameSchema,
  updateUserNameSchema,
} from '@/validations/schemas/user-update';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

function OverviewTab() {
  const { user: userData, setUser } = useUserContext();

  const { control, formState, setError, handleSubmit } =
    useForm<UpdateUserNameSchema>({
      resolver: zodResolver(updateUserNameSchema),
      defaultValues: { name: userData?.name ?? '' },
      mode: 'onTouched',
      reValidateMode: 'onChange',
    });

  const formattedCreatedAt = userData?.created_at
    ? new Intl.DateTimeFormat(undefined, {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(userData.created_at))
    : undefined;

  async function onSubmit(data: UpdateUserNameSchema) {
    const response = await updateCurrentUserNameAction(data);

    if (!response.success) {
      handleApiErrors(response, setError, updateUserNameSchema);
      return;
    }

    setUser(response);
  }

  return (
    <TabsContent value='overview' className='flex flex-col gap-4'>
      <dl className='space-y-4 text-sm'>
        <div className='space-y-1'>
          <dt>Your Email</dt>
          <dd className='flex gap-2 items-center text-muted-foreground ml-2'>
            <span>{userData?.email ?? 'ERROR'}</span>
          </dd>
        </div>

        <div className='space-y-1'>
          <dt>Created At</dt>
          <dd className='text-muted-foreground ml-2'>{formattedCreatedAt}</dd>
        </div>
      </dl>

      <Separator />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='name'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name'>Name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id='name'
                    autoComplete='off'
                    aria-describedby='name-errors'
                    aria-invalid={fieldState.invalid}
                    disabled={formState.isSubmitting}
                    aria-disabled={formState.isSubmitting}
                    required
                  />
                  <InputGroupAddon>
                    <IconSignature />
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.error && (
                  <FieldError id='name-errors' errors={[fieldState.error]} />
                )}
                {formState.isSubmitSuccessful && (
                  <p
                    role='alert'
                    className='text-sm text-success font-medium text- mb-4'
                  >
                    Name updated successfully
                  </p>
                )}
              </Field>
            )}
          />

          <div className='flex gap-2 mt-3 justify-end'>
            <DialogClose asChild>
              <Button variant='secondary'>Cancel</Button>
            </DialogClose>
            <Button
              size='sm'
              type='submit'
              disabled={
                formState.isSubmitting ||
                !formState.isValid ||
                !formState.isDirty
              }
              aria-disabled={!formState.isValid || formState.isSubmitting}
              className='relative'
            >
              {formState.isSubmitting && (
                <div className='absolute inset-0 flex items-center justify-center'>
                  <Spinner />
                </div>
              )}

              <span className={formState.isSubmitting ? 'invisible' : ''}>
                Update
              </span>
            </Button>
          </div>
        </FieldGroup>
      </form>
    </TabsContent>
  );
}

export { OverviewTab };
