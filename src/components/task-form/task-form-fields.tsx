'use client';

import { cn } from '@/utils/cn';
import { DatePicker } from '../ui/date-picker';
import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import {
  IconLayersSelectedBottom,
  IconSignature,
  IconSquareRoundedFilled,
} from '@tabler/icons-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '../ui/input-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export type TaskFormFieldsSections = {
  id: number;
  name: string;
};

type TaskFormFieldsProps = {
  sections?: TaskFormFieldsSections[];
};

function TaskFormFields({ sections }: TaskFormFieldsProps) {
  const { control, formState } = useFormContext();

  const selectClasses = cn(
    'flex items-center gap-2 before:content-[""] before:size-4 before:rounded-sm',
  );

  const selectItemsMap = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'low',
      label: 'Low',
      classes: `${selectClasses} before:bg-green-700/50`,
    },
    {
      value: 'medium',
      label: 'Medium',
      classes: `${selectClasses} before:bg-yellow-500/50`,
    },
    {
      value: 'high',
      label: 'High',
      classes: `${selectClasses} before:bg-red-800/50`,
    },
  ];

  return (
    <FieldGroup className='gap-2'>
      <Controller
        name='title'
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='title' className='sr-only'>
              Task name
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id='title'
                placeholder='Task title'
                aria-describedby='task-title-error'
                aria-invalid={fieldState.invalid}
                disabled={formState.isSubmitting}
                aria-disabled={formState.isSubmitting}
                maxLength={255}
              />
              <InputGroupAddon>
                <IconSignature />
              </InputGroupAddon>
              <InputGroupAddon align='inline-end'>
                <InputGroupText className='text-xs'>
                  {field.value?.length}/255
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            {fieldState.invalid && (
              <FieldError
                role='alert'
                id='task-title-error'
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />

      <Controller
        name='description'
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='description' className='sr-only'>
              Description
            </FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                {...field}
                id='description'
                placeholder='Task Description'
                aria-describedby='task-description-error'
                aria-invalid={fieldState.invalid}
                disabled={formState.isSubmitting}
                aria-disabled={formState.isSubmitting}
                maxLength={2000}
              />
              <InputGroupAddon align='block-end' className='text-xs'>
                {field.value?.length}/2000
              </InputGroupAddon>
            </InputGroup>

            {fieldState.invalid && (
              <FieldError
                role='alert'
                id='task-description-error'
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />

      <div className='flex flex-wrap gap-2 *:w-fit'>
        <Controller
          name='priority'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='priority' className='sr-only'>
                Priority
              </FieldLabel>

              <Select
                defaultValue={field.value}
                value={field.value ?? ''}
                onValueChange={val => {
                  if (val === 'none') {
                    field.onChange(null);
                  } else {
                    field.onChange(val);
                  }
                }}
              >
                <SelectTrigger
                  id='priority'
                  aria-describedby='task-priority-error'
                  aria-invalid={fieldState.invalid}
                  disabled={formState.isSubmitting}
                  aria-disabled={formState.isSubmitting}
                  className='cursor-pointer'
                >
                  <SelectValue
                    placeholder={
                      <span className='flex items-center gap-2'>
                        <IconSquareRoundedFilled /> Priority
                      </span>
                    }
                  />
                </SelectTrigger>

                <SelectContent position='popper'>
                  <SelectGroup>
                    <SelectLabel>Priorities</SelectLabel>
                    {selectItemsMap.map((item, idx) => (
                      <SelectItem value={item.value} key={idx}>
                        <span className={item.classes}>{item.label}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {fieldState.invalid && (
                <FieldError
                  role='alert'
                  id='task-priority-error'
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />

        {sections && (
          <Controller
            name='section_id'
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='section' className='sr-only'>
                  Priority
                </FieldLabel>

                <Select
                  onValueChange={val => {
                    if (val === 'none') {
                      field.onChange(null);
                    } else {
                      field.onChange(Number(val));
                    }
                  }}
                >
                  <SelectTrigger
                    id='section'
                    aria-describedby='task-section-error'
                    aria-invalid={fieldState.invalid}
                    disabled={formState.isSubmitting}
                    aria-disabled={formState.isSubmitting}
                    className='cursor-pointer'
                  >
                    <SelectValue
                      placeholder={
                        <span className='flex items-center gap-2'>
                          <IconLayersSelectedBottom /> Section
                        </span>
                      }
                    />
                  </SelectTrigger>

                  <SelectContent position='popper'>
                    <SelectGroup>
                      <SelectLabel>Sections</SelectLabel>
                      <SelectItem value='none'>
                        <span>None</span>
                      </SelectItem>

                      {sections.map((item, idx) => (
                        <SelectItem
                          value={item.id.toString()}
                          title={item.name}
                          key={idx}
                        >
                          <span className='flex items-center gap-1 max-w-45 line-clamp-2'>
                            <IconLayersSelectedBottom />
                            {item.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError
                    role='alert'
                    id='task-section-error'
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
        )}

        <Controller
          name='due_at'
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor='due_at'
                className='sr-only'
                aria-describedby='task-due-at-error'
              >
                Due date
              </FieldLabel>
              <DatePicker
                triggerId='due_at'
                placeholder='Due date'
                onValueChange={field.onChange}
                value={field.value}
              />

              {fieldState.invalid && (
                <FieldError
                  role='alert'
                  id='task-due-at-error'
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
      </div>

      {formState.errors.root?.server && (
        <p className='text-destructive mb-4 text-sm' role='alert'>
          {formState.errors.root.server.message}
        </p>
      )}
    </FieldGroup>
  );
}

export { TaskFormFields };
