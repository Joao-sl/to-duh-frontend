'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { TabsContent } from '@/components/ui/tabs';
import { DialogClose } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IconAlertTriangle } from '@tabler/icons-react';
import { deleteCurrentUserAction } from '@/app/actions/user/delete-current-user';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DeleteUserSchema,
  deleteUserSchema,
} from '@/validations/schemas/user-update';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

function DeleteTab() {
  const { control, formState, handleSubmit } = useForm<DeleteUserSchema>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: { delete: '' },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  async function onSubmit() {
    const response = await deleteCurrentUserAction();

    if (response && !response.success) {
      toast.error(
        'Sorry, we could not delete your account due to an internal server error. Please try again later.',
      );
    }
  }

  return (
    <TabsContent value='delete'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name='delete'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldDescription>
                  Deleting your account is permanent. All your data, including
                  your profile, settings and content, will be permanently
                  removed and cannot be recovered.
                </FieldDescription>

                <FieldLabel htmlFor='delete'>
                  Please type
                  <span className='font-bold text-destructive'>
                    &quot;DELETE&quot;
                  </span>
                  to confirm.
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id='delete'
                    placeholder='DELETE'
                    aria-describedby='delete-error'
                    aria-invalid={fieldState.invalid}
                    disabled={formState.isSubmitting}
                    aria-disabled={formState.isSubmitting}
                    required
                  />
                  <InputGroupAddon>
                    <IconAlertTriangle />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.error && (
                  <FieldError id='delete-error' errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className='flex gap-2 justify-end'>
            <DialogClose asChild>
              <Button variant='secondary' size='sm' type='button'>
                Cancel
              </Button>
            </DialogClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant='destructive'
                  size='sm'
                  disabled={!formState.isValid || formState.isSubmitting}
                  aria-disabled={!formState.isValid || formState.isSubmitting}
                  type='button'
                  className='relative'
                >
                  Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This cannot be undone and all your data will be permanently
                    deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <Separator />

                <AlertDialogFooter>
                  <AlertDialogCancel size='sm'>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    size='sm'
                    variant='destructive'
                    onClick={async () => await onSubmit()}
                    type='submit'
                    disabled={formState.isSubmitting}
                    aria-disabled={formState.isSubmitting}
                    className='relative'
                  >
                    {formState.isSubmitting && (
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <Spinner />
                      </div>
                    )}

                    <span className={formState.isSubmitting ? 'invisible' : ''}>
                      Delete
                    </span>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </FieldGroup>
      </form>
    </TabsContent>
  );
}

export { DeleteTab };
