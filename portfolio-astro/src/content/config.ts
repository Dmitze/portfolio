import { z, defineCollection } from 'astro:content';

// Колекція проектів з типами та перевіркою
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    year: z.number().int().min(2000).max(2100),
    stack: z.array(z.string()).default([]),
    role: z.string().optional(),
    descriptionShort: z.string().max(280),
    descriptionLong: z.string().optional(),
    links: z.object({ demo: z.string().url().optional(), repo: z.string().url().optional() }).optional(),
    cover: z.string(),
    gallery: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    ogImage: z.string().optional()
  })
});

export const collections = { projects };