import { cn } from '@/utils/cn';
import { Suspense } from 'react';
import { UsersLogInForm } from '@/components/log-in-form';
import { Spinner } from '@/components/ui/spinner';

export default async function Login() {
  return (
    <div
      className={cn(
        'flex h-screen justify-center items-center',
        'bg-linear-to-br from-transparent to-primary/25',
      )}
    >
      <Suspense
        fallback={
          <div className='flex size-svw'>
            <Spinner />
          </div>
        }
      >
        <UsersLogInForm />
      </Suspense>
    </div>
  );
}
