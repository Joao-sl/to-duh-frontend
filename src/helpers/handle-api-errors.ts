import z from 'zod';
import { Path, FieldValues, UseFormSetError } from 'react-hook-form';

export function handleApiErrors<T extends FieldValues>(
  apiData: Record<string, string>,
  setError: UseFormSetError<T>,
  schema: z.ZodObject<z.ZodRawShape>,
) {
  const formFields = Object.keys(schema.shape);

  if (!apiData.errors) {
    setError('root.server', {
      message: apiData.message
        ? `${apiData.message}, this is not your fault, please try again latter`
        : 'Internal server error please try again later.',
    });
  }

  Object.entries(apiData.errors).forEach(([key, message]) => {
    if (formFields.includes(key)) {
      setError(key as Path<T>, {
        type: 'server',
        message: String(message),
      });
    } else {
      setError('root.server', {
        message: String(message),
      });
    }
  });
}
