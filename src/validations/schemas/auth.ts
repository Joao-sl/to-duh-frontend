import z from 'zod';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, { error: 'Name must contain at last 3 characters' })
      .max(50, { error: 'Name must contain max 50 characters' }),
    email: z.email(),
    password: z
      .string()
      .min(8, { error: 'Password must contain min 8 characters' })
      .max(128, { error: 'Password must contais max 128 characters' })
      .regex(/[A-Z]/, {
        error: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        error: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[`!@#$%^&*()_\-+={[}\]|:;"'<,>.?~ ]/, {
        error: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const logInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type LogInSchema = z.infer<typeof logInSchema>;
