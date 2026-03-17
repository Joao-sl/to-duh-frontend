import z from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, { error: 'Must have at least 1 character' }).max(80),
  description: z.string().max(255).optional(),
  is_favorite: z.boolean().optional(),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
