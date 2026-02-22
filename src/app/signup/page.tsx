import { cn } from '@/utils/cn';
import { UsersSignUpForm } from '@/components/sign-up-form';

export default function SignUp() {
  return (
    <div
      className={cn(
        'flex h-screen justify-center items-center',
        'bg-linear-to-br from-transparent to-primary/25',
      )}
    >
      <UsersSignUpForm />
    </div>
  );
}
