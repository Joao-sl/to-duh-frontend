import z from 'zod';
import { signUpSchema } from './auth';

export const updateUserNameSchema = z.object({
  name: signUpSchema.shape.name,
});

const password = signUpSchema.shape.password;
export const updateUserPasswordSchema = z
  .object({
    password: z.string(),
    newPassword: password,
    confirmNewPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    error: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });

export const deleteUserSchema = z.object({
  delete: z.string().refine(value => value.toLocaleLowerCase() === 'delete', {
    error: 'You must type "DELETE" correctly',
  }),
});

export type UpdateUserPasswordSchema = z.infer<typeof updateUserPasswordSchema>;
export type UpdateUserNameSchema = z.infer<typeof updateUserNameSchema>;
export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
