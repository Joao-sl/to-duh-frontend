import z from 'zod';

export const createTaskSchema = z.object({
  project_id: z.number().positive(),
  section_id: z.number().positive().optional(),
  title: z.string().min(1).max(255),
  description: z.string().max(2000).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  due_at: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
      error: 'Date must be in format YYYY-MM-DDTHH:mm:ss.SSSZ',
    })
    .optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
