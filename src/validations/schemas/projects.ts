import * as z from 'zod';

const projectFields = {
  name: z
    .string()
    .min(1, { error: 'Name must have at least 1 character' })
    .max(80, { error: 'Name must have at most 80 characters' }),

  description: z
    .string()
    .max(255, { error: 'Description must have at most 255 characters' }),

  is_favorite: z.boolean({ error: 'Favorite must be a boolean value' }),
};

export const createProjectSchema = z.object({
  name: projectFields.name,
  description: projectFields.description.nullish(),
  is_favorite: projectFields.is_favorite.nullish(),
});

export const updateProjectSchema = z.object({
  name: projectFields.name.optional(),
  description: projectFields.description.nullish(),
  is_favorite: projectFields.is_favorite.nullish(),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
