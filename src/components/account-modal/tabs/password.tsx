'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { TabsContent } from '@/components/ui/tabs';
import { DialogClose } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { IconEye, IconEyeOff, IconKey, IconLock } from '@tabler/icons-react';
import { updateCurrentUserPasswordAction } from '@/app/actions/user/update-current-user-password-';
import {
  UpdateUserPasswordSchema,
  updateUserPasswordSchema,
} from '@/validations/schemas/user-update';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

function PasswordTab() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const { control, formState, setError, reset, handleSubmit } =
    useForm<UpdateUserPasswordSchema>({
      resolver: zodResolver(updateUserPasswordSchema),
      defaultValues: {
        password: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      mode: 'onTouched',
      reValidateMode: 'onChange',
    });

  async function onSubmit(data: UpdateUserPasswordSchema) {
    const response = await updateCurrentUserPasswordAction(data);

    if (!response.success) {
      handleApiErrors(response, setError, updateUserPasswordSchema);
      return;
    }

    reset();
  }

  return (
    <TabsContent value='password'>
      {formState.isSubmitSuccessful && (
        <p
          role='alert'
          className='text-sm text-success font-medium text-center mb-4'
        >
          Password updated successfully
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {formState.errors.root?.server && (
          <p className='text-destructive text-center mb-4 text-sm' role='alert'>
            {formState.errors.root.server.message}
          </p>
        )}

        <FieldGroup>
          <Controller
            name='password'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='password'>Current password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id='password'
                    type={showPassword.password ? 'text' : 'password'}
                    autoComplete='off'
                    placeholder='Enter your current password'
                    aria-describedby='password-error'
                    aria-invalid={fieldState.invalid}
                    disabled={formState.isSubmitting}
                    aria-disabled={formState.isSubmitting}
                    required
                  />
                  <InputGroupAddon>
                    <IconKey />
                  </InputGroupAddon>
                  <InputGroupAddon align='inline-end'>
                    <InputGroupButton
                      size='icon-sm'
                      onClick={() =>
                        setShowPassword(prev => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
                    >
                      {showPassword.password ? <IconEye /> : <IconEyeOff />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.error && (
                  <FieldError id='password-error' errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='newPassword'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='new-password'>New password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id='new-password'
                    type={showPassword.newPassword ? 'text' : 'password'}
                    autoComplete='off'
                    placeholder='Enter your new password'
                    aria-describedby='new-password-errors'
                    aria-invalid={fieldState.invalid}
                    disabled={formState.isSubmitting}
                    aria-disabled={formState.isSubmitting}
                    required
                  />
                  <InputGroupAddon>
                    <IconLock />
                  </InputGroupAddon>
                  <InputGroupAddon align='inline-end'>
                    <InputGroupButton
                      size='icon-sm'
                      onClick={() =>
                        setShowPassword(prev => ({
                          ...prev,
                          newPassword: !prev.newPassword,
                        }))
                      }
                    >
                      {showPassword.newPassword ? <IconEye /> : <IconEyeOff />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.error && (
                  <FieldError
                    id='new-password-errors'
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name='confirmNewPassword'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='confirm-new-password'>
                  Current password
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id='confirm-new-password'
                    name='confirm-new-password'
                    type={showPassword.confirmNewPassword ? 'text' : 'password'}
                    autoComplete='off'
                    placeholder='Enter your current password'
                    aria-describedby='confirm-new-password-errors'
                    aria-invalid={fieldState.invalid}
                    disabled={formState.isSubmitting}
                    aria-disabled={formState.isSubmitting}
                    required
                  />
                  <InputGroupAddon>
                    <IconLock />
                  </InputGroupAddon>
                  <InputGroupAddon align='inline-end'>
                    <InputGroupButton
                      size='icon-sm'
                      onClick={() =>
                        setShowPassword(prev => ({
                          ...prev,
                          confirmNewPassword: !prev.confirmNewPassword,
                        }))
                      }
                    >
                      {showPassword.confirmNewPassword ? (
                        <IconEye />
                      ) : (
                        <IconEyeOff />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.error && (
                  <FieldError
                    id='confirm-new-password-errors'
                    errors={[fieldState.error]}
                  />
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
            <Button
              size='sm'
              type='submit'
              disabled={!formState.isValid || formState.isSubmitting}
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

export { PasswordTab };
