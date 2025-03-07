import { z } from 'zod';
import { ResourceType } from '../utils/types/models';

// Assuming a minimal HalLink schema
export const halLinkSchema = z.object({
  href: z.string().url(),
  // Additional properties can be added if needed (e.g., templated)
});

// A simple HalResource schema. Since HalResource is typically a marker type,
// we'll require that _links exists as a record of HalLink or arrays of HalLink.
export const halResourceSchema = z.object({
  _links: z.record(z.union([halLinkSchema, z.array(halLinkSchema)])),
});

// BaseResource schema extends HalResource and adds required properties.
export const baseResourceSchema = halResourceSchema.extend({
  nickname: z.string(),
  active: z.boolean(),
  createdAt: z.string(), // You might refine this to a date string or transform it
  modifiedAt: z.string(),
  type: z.nativeEnum(ResourceType),
  privileges: z.record(z.array(z.string())),
});

// Since App = BaseResource, we can reuse the baseResourceSchema.
export const appSchema = baseResourceSchema;

// TemplateProperty schema
export const templatePropertySchema = z.object({
  type: z.string(),
  name: z.string(),
  value: z.string().optional(),
});

// Template schema
export const templateSchema = z.object({
  method: z.string(),
  title: z.string(),
  target: z.string(),
  properties: z.array(templatePropertySchema),
});

// Group schema extends BaseResource and adds a _templates record.
export const groupSchema = baseResourceSchema.extend({
  _templates: z.record(templateSchema),
});

// User schema extends BaseResource and adds a hasPassword property.
export const userSchema = baseResourceSchema.extend({
  hasPassword: z.boolean(),
});

// Export inferred types if needed
export type AppSchema = z.infer<typeof appSchema>;
export type GroupSchema = z.infer<typeof groupSchema>;
export type TemplatePropertySchema = z.infer<typeof templatePropertySchema>;
export type TemplateSchema = z.infer<typeof templateSchema>;
export type UserSchema = z.infer<typeof userSchema>;