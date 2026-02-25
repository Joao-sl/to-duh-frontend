import { cn } from '@/utils/cn';
import { UsersLogInForm } from '@/components/log-in-form';

export default function Login() {
  return (
    <div
      className={cn(
        'flex h-screen justify-center items-center',
        'bg-linear-to-br from-transparent to-primary/25',
      )}
    >
      <UsersLogInForm />
    </div>
  );
}
