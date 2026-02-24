'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAt, IconLock } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { logInSchema, LogInSchema } from '@/validations/schemas/auth';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

function UsersLogInForm() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email');
  const createdParam = searchParams.get('created');
  const router = useRouter();

  useEffect(() => {
    if (createdParam === 'true') {
      toast.success('Account created successfully');
    }
    router.replace('/login');
  }, [router, createdParam]);

  const { control, formState, setError, setValue, handleSubmit } =
    useForm<LogInSchema>({
      resolver: zodResolver(logInSchema),
      defaultValues: {
        email: `${emailParam ?? ''}`,
        password: '',
      },
      mode: 'onTouched',
    });

  async function onSubmit(data: LogInSchema) {
    const response = await fetch('api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const apiData = await response.json();

    if (!response.ok) {
      console.log(apiData);
      handleApiErrors(apiData, setError, logInSchema);
      setValue('password', '');
      return;
    }

    router.push('/hub');
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
        <CardTitle className='text-2xl'>Welcome back</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='email'
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={formState.isSubmitting}>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id='email'
                      placeholder='Enter your email'
                      autoComplete='on'
                      aria-describedby='email-error credentials-error'
                      aria-invalid={fieldState.invalid}
                      disabled={formState.isSubmitting}
                      aria-disabled={formState.isSubmitting}
                      required
                    />
                    <InputGroupAddon>
                      <IconAt />
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.error && (
                    <FieldError id='email-error' errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name='password'
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id='password'
                      type='password'
                      placeholder='Enter your password'
                      autoComplete='off'
                      aria-describedby='password-error credentials-error'
                      aria-invalid={fieldState.invalid}
                      disabled={formState.isSubmitting}
                      aria-disabled={formState.isSubmitting}
                      required
                    />
                    <InputGroupAddon>
                      <IconLock />
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.error && (
                    <FieldError
                      id='password-error'
                      errors={[fieldState.error]}
                      className='text-sm text-error'
                    />
                  )}
                  {formState.errors.root?.server && (
                    <FieldError
                      id='credentials-error'
                      role='alert'
                      errors={[
                        { message: formState.errors.root?.server?.message },
                      ]}
                      className='text-sm text-error'
                    />
                  )}
                </Field>
              )}
            />

            <Button>{formState.isSubmitting ? <Spinner /> : 'Login'}</Button>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className='justify-center text-sm text-muted-foreground'>
        <p>
          Don&apos;t have an account?{' '}
          <Link
            href='/signup'
            className='hover:text-blue-600 hover:underline transition'
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export { UsersLogInForm };
