import * as z from 'zod';

const taskFields = {
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
    error: 'Priority accepts only: low, medium or high',
  }),

  due_at: z.iso.datetime(),
};

export const createTaskSchema = z.object({
  project_id: taskFields.project_id,
  title: taskFields.title,
  section_id: taskFields.section_id.nullish(),
  description: taskFields.description.optional(),
  priority: taskFields.priority.nullish(),
  due_at: taskFields.due_at.nullish(),
});

export const updateTaskSchema = z.object({
  title: taskFields.title.optional(),
  description: taskFields.description.optional(),
  priority: taskFields.priority.nullish(),
  due_at: taskFields.due_at.nullish(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
