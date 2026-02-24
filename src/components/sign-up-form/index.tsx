'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { type SignUpSchema, signUpSchema } from '@/validations/schemas/auth';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Spinner } from '../ui/spinner';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '../ui/input-group';
import {
  IconAt,
  IconEye,
  IconEyeOff,
  IconLock,
  IconSignature,
} from '@tabler/icons-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

function UsersSignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const { control, setError, handleSubmit, formState, reset } =
    useForm<SignUpSchema>({
      resolver: zodResolver(signUpSchema),
      defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      mode: 'onTouched',
      reValidateMode: 'onChange',
    });

  async function onSubmit(data: SignUpSchema) {
    try {
      const response = await fetch('api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const apiData = await response.json();

      if (!response.ok) {
        handleApiErrors(apiData, setError, signUpSchema);
        return;
      }

      reset();
      router.push(`/login?email=${apiData.email}&created=true`);
    } catch {
      setError('root.server', {
        message: 'Internal server error please try again later.',
      });
    }
  }

  return (
    <Card className='w-100 m-4 bg-transparent shadow-xl'>
      <CardHeader className='text-center'>
        <div
          aria-hidden
          className='flex items-center justify-center font-black'
        >
          <div className='p-1'>LOGO</div>
        </div>
        <CardTitle className='text-2xl'>Sign in with email</CardTitle>
        <CardDescription>
          Organize your tasks fast, simple and free
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formState.errors.root?.server && (
            <p
              className='text-destructive text-center mb-4 text-sm'
              role='alert'
            >
              {formState.errors.root.server.message}
            </p>
          )}
          <FieldGroup>
            <Controller
              name='name'
              control={control}
              render={({ field, fieldState, formState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='name' required>
                    Name
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id='name'
                      placeholder='Enter your name'
                      autoComplete='off'
                      aria-describedby='name-error'
                      aria-invalid={fieldState.invalid}
                      aria-disabled={formState.isSubmitting}
                      disabled={formState.isSubmitting}
                      required
                    />

                    <InputGroupAddon>
                      <IconSignature />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError id='name-error' errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name='email'
              control={control}
              render={({ field, fieldState, formState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='email' required>
                    Email
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id='email'
                      placeholder='Enter your email'
                      autoComplete='on'
                      aria-describedby='email-error'
                      aria-invalid={fieldState.invalid}
                      aria-disabled={formState.isSubmitting}
                      disabled={formState.isSubmitting}
                      required
                    />
                    <InputGroupAddon>
                      <IconAt />
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError id='email-error' errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name='password'
              control={control}
              render={({ field, fieldState, formState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='password' required>
                    Password
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id='password'
                      placeholder='Enter your password'
                      type={showPassword.password ? 'text' : 'password'}
                      aria-describedby='password-error'
                      aria-invalid={fieldState.invalid}
                      aria-disabled={formState.isSubmitting}
                      disabled={formState.isSubmitting}
                      required
                    />

                    <InputGroupAddon>
                      <IconLock />
                    </InputGroupAddon>

                    <InputGroupAddon align='inline-end'>
                      <InputGroupButton
                        className='hover:bg-transparent'
                        size='sm'
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

                  {fieldState.invalid && (
                    <FieldError
                      id='password-error'
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name='confirmPassword'
              control={control}
              render={({ field, fieldState, formState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='confirmPassword' required>
                    Confirm Password
                  </FieldLabel>

                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id='confirmPassword'
                      placeholder='Confirm your password'
                      type={showPassword.confirmPassword ? 'text' : 'password'}
                      aria-describedby='confirm-password-error'
                      aria-invalid={fieldState.invalid}
                      aria-disabled={formState.isSubmitting}
                      disabled={formState.isSubmitting}
                      required
                    />

                    <InputGroupAddon>
                      <IconLock />
                    </InputGroupAddon>

                    <InputGroupAddon align='inline-end'>
                      <InputGroupButton
                        className='hover:bg-transparent'
                        size='sm'
                        onClick={() =>
                          setShowPassword(prev => ({
                            ...prev,
                            confirmPassword: !prev.confirmPassword,
                          }))
                        }
                      >
                        {showPassword.confirmPassword ? (
                          <IconEye />
                        ) : (
                          <IconEyeOff />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError
                      id='confirm-password-error'
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            <Button disabled={formState.isSubmitting}>
              {formState.isSubmitting ? <Spinner /> : 'Sign up'}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className='justify-center text-sm text-muted-foreground'>
        <p>
          Already have an account?{' '}
          <Link
            href='/login'
            className='hover:text-blue-600 hover:underline transition'
          >
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export { UsersSignUpForm };
