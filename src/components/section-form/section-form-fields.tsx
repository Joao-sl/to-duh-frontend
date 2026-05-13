import { cn } from '@/utils/cn';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group';

type SectionFormFieldsProps = {
  hideLabels?: boolean;
};

function SectionFormFields({ hideLabels = false }: SectionFormFieldsProps) {
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
                placeholder='Name your section'
                autoComplete='off'
                minLength={1}
                maxLength={255}
                aria-describedby='section-name-error'
                aria-invalid={fieldState.invalid}
                aria-disabled={formState.isSubmitting}
                disabled={formState.isSubmitting}
                required
              />

              <InputGroupAddon align='inline-end'>
                {field.value?.length}/255
              </InputGroupAddon>
            </InputGroup>

            {fieldState.invalid && (
              <FieldError id='section-name-error' errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />

      {formState.errors.root?.server && (
        <p className='text-destructive mb-4 text-sm' role='alert'>
          {formState.errors.root.server.message}
        </p>
      )}
    </FieldGroup>
  );
}

export { SectionFormFields };
