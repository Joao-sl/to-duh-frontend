import { cn } from '@/utils/cn';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

type FormActionsProps = {
  onCancel: VoidFunction;
  isSubmitting: boolean;
  isDirty: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  className?: string;
};

function FormActions({
  onCancel,
  isSubmitting,
  isDirty,
  submitButtonText = 'Create',
  cancelButtonText = 'Cancel',
  className,
}: FormActionsProps) {
  return (
    <div className={cn('flex justify-end gap-2', className)}>
      <Button
        type='button'
        size='sm'
        variant='secondary'
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        onClick={onCancel}
      >
        {cancelButtonText}
      </Button>

      <Button
        size='sm'
        type='submit'
        disabled={isSubmitting || !isDirty}
        aria-disabled={isSubmitting}
        className='relative'
      >
        <span className={cn({ 'opacity-0': isSubmitting })}>
          {submitButtonText}
        </span>

        <Spinner
          aria-hidden
          className={cn(
            'absolute bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 opacity-0',
            { 'opacity-100': isSubmitting },
          )}
        />
      </Button>
    </div>
  );
}

export { FormActions };
