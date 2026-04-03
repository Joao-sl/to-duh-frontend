import z from 'zod';

const baseTaskSchema = z.object({
  project_id: z.number().positive(),
  section_id: z.number().positive(),
  title: z.string().min(1).max(255),
  description: z.string().max(2000),
  priority: z.enum(['low', 'medium', 'high']),
  due_at: z.iso.datetime(),
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
