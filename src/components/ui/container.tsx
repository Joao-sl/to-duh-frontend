import { cn } from '@/utils/cn';
import { Slot } from 'radix-ui';

type ContainerProps = {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
} & React.ComponentProps<'div'>;

function Container({ children, asChild, className, ...props }: ContainerProps) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      className={cn('flex-1 max-w-2xl mx-auto px-4 py-10', className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Container };
