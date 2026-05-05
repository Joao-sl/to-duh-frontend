import { cn } from '@/utils/cn';
import { Switch } from '../ui/switch';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from '../ui/input-group';

type ProjectFormFieldsProps = {
  hideLabels?: boolean;
};

function ProjectFormFields({ hideLabels = false }: ProjectFormFieldsProps) {
  const { control, formState } = useFormContext();

  return (
    <FieldGroup className={cn({ 'gap-3': hideLabels })}>
      <Controller
        name='name'
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor='name'
              required
              className={cn({ 'sr-only': hideLabels })}
            >
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
            <FieldLabel
              htmlFor='description'
              className={cn({ 'sr-only': hideLabels })}
            >
              Description
            </FieldLabel>

            <InputGroup>
              <InputGroupTextarea
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

              <InputGroupAddon align='inline-end'>
                {field.value?.length}/255
              </InputGroupAddon>
            </InputGroup>

            {fieldState.invalid && (
              <FieldError id='description-error' errors={[fieldState.error]} />
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

      {formState.errors.root?.server && (
        <p className='text-destructive mb-4 text-sm' role='alert'>
          {formState.errors.root.server.message}
        </p>
      )}
    </FieldGroup>
  );
}

export { ProjectFormFields };
