import { cn } from '@/utils/cn';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { Separator } from '../ui/separator';
import { isValidElement, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconAt, IconTextPlus } from '@tabler/icons-react';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { handleApiErrors } from '@/helpers/handle-api-errors';
import { useProjectsContext } from '@/contexts/projects-context';
import { createProjectAction } from '@/app/actions/project/create-project';
import {
  createProjectSchema,
  type CreateProjectSchema,
} from '@/validations/schemas/projects';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

type CreateProjectModalProps = {
  children: React.ReactNode;
};

function CreateProjectModal({ children }: CreateProjectModalProps) {
  const [open, setOpen] = useState(false);
  const { setProjects } = useProjectsContext();

  const { control, formState, reset, setError, handleSubmit } =
    useForm<CreateProjectSchema>({
      resolver: zodResolver(createProjectSchema),
      defaultValues: {
        name: '',
        description: '',
        is_favorite: false,
      },
      mode: 'onChange',
      reValidateMode: 'onChange',
    });

  const handleOpen = (value: boolean) => {
    setOpen(value);
    reset();
  };

  async function onSubmit(data: CreateProjectSchema) {
    const response = await createProjectAction(data);

    if (!response.success) {
      handleApiErrors(response, setError, createProjectSchema);
      return;
    }

    delete response.success;
    setProjects(prev => {
      if (!prev.success) {
        return prev;
      }
      return { ...prev, data: [response, ...prev.data] };
    });
    setOpen(false);
    reset();
  }

  const isElement = isValidElement(children);
  const asChild = isElement ? true : false;

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger onClick={() => setOpen(true)} asChild={asChild}>
        {children}
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <DialogHeader>
            <DialogTitle>Creating a project</DialogTitle>
            <DialogDescription>
              Create a project to hold your tasks
            </DialogDescription>
          </DialogHeader>

          <Separator />

          {formState.errors.root?.server && (
            <p
              className='text-destructive text-center mb-4 text-sm'
              role='alert'
            >
              {formState.errors.root.server.message}
            </p>
          )}

          <Controller
            name='name'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='name' required>
                  Name
                </FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id='name'
                    placeholder='Name your project'
                    autoComplete='off'
                    maxLength={80}
                    aria-describedby='name-error'
                    aria-invalid={fieldState.invalid}
                    aria-disabled={formState.isSubmitting}
                    disabled={formState.isSubmitting}
                    required
                  />

                  <InputGroupAddon>
                    <IconAt />
                  </InputGroupAddon>

                  <InputGroupAddon align='inline-end'>
                    {field.value?.length}/80
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError id='name-error' errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name='description'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='description'>Description</FieldLabel>

                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id='description'
                    placeholder='Description of your project (optional)'
                    autoComplete='off'
                    maxLength={255}
                    aria-describedby='description-error'
                    aria-invalid={fieldState.invalid}
                    aria-disabled={formState.isSubmitting}
                    disabled={formState.isSubmitting}
                  />

                  <InputGroupAddon>
                    <IconTextPlus />
                  </InputGroupAddon>

                  <InputGroupAddon align='inline-end'>
                    {field.value?.length}/255
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError
                    id='description-error'
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name='is_favorite'
            control={control}
            render={({ field, fieldState }) => {
              const { value, onChange, ...restField } = field;

              return (
                <Field data-invalid={fieldState.invalid}>
                  <div className='flex items-center gap-2'>
                    <Switch
                      id='is_favorite'
                      checked={value}
                      onCheckedChange={onChange}
                      {...restField}
                    />
                    <FieldLabel htmlFor='is_favorite'>Is favorite</FieldLabel>
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      id='is-favorite-error'
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              );
            }}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button size='sm' variant='secondary' type='button'>
                Cancel
              </Button>
            </DialogClose>

            <Button
              size='sm'
              type='submit'
              disabled={!formState.isValid || formState.isSubmitting}
              className='relative'
            >
              <span
                className={formState.isSubmitting ? 'opacity-0' : 'opacity-100'}
              >
                Create
              </span>
              <Spinner
                aria-hidden={!formState.isSubmitting}
                className={cn(
                  'absolute',
                  formState.isSubmitting ? 'opacity-100' : 'opacity-0',
                )}
              />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { CreateProjectModal };
