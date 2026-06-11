import * as z from 'zod';

const sectionFields = {
  project_id: z
    .number({ error: 'Project id must be a number' })
    .positive({ error: 'Project id must be a positive number' }),

  name: z
    .string()
    .min(1, { error: 'Name must have at least 1 character' })
    .max(255, { error: 'Name must have at most 255 characters' })
    .trim(),

  is_archived: z.boolean({ error: 'Is archived must be a boolean' }),
};

export const createSectionSchema = z.object({
  project_id: sectionFields.project_id,
  name: sectionFields.name,
});

export const updateSectionSchema = z.object({
  name: sectionFields.name.optional(),
  is_archived: sectionFields.is_archived.optional(),
});

export type CreateSectionSchema = z.infer<typeof createSectionSchema>;
export type UpdateSectionSchema = z.infer<typeof updateSectionSchema>;
