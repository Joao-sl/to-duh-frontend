import z from 'zod';

const baseTaskSchema = z.object({
  project_id: z
    .number({ error: 'Project id must be a number' })
    .positive({ error: 'Project id must be a positive number' }),
  section_id: z
    .number({ error: 'Section id must be a number' })
    .positive({ error: 'Section id must be a positive number' }),
  title: z
    .string({ error: 'Title must be a string' })
    .min(1, { error: 'Title must be at least 1 character' })
    .max(255, { error: 'Title must have at most 255 characters' }),
  description: z
    .string({ error: 'Description must be a string' })
    .max(2000, { error: 'Description must have at most 2000 characters' }),
  priority: z.enum(['low', 'medium', 'high'], {
    error: 'Priority accept only the values: low, medium or high',
  }),
  due_at: z.iso.datetime('Due at must be a valid ISO datetime'),
});

export const createTaskSchema = baseTaskSchema.partial({
  section_id: true,
  description: true,
  priority: true,
  due_at: true,
});

export const updateTaskSchema = baseTaskSchema.partial();

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
