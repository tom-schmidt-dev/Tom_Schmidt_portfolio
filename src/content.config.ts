import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

// Sub-Schemas für Content-Blöcke (Projekte)
export const HighlightSectionSchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

export const ContentBlockSchema = z.union([z.string(), HighlightSectionSchema]);

// Schema für Projekte
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  shortTitle: z.string().optional(),
  tabs: z.array(z.string()).optional(),
  description: z.union([
    z.string(),
    HighlightSectionSchema,
    z.array(ContentBlockSchema),
  ]).optional(),
  category: z.string(),
  period: z.string().optional(),
  privat: z.boolean().optional(),
  uni: z.boolean().optional(),
  isPlaceholder: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  shortTags: z.array(z.string()).optional(),
  githubUrl: z.string().optional(),
  sourceUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  ergebnis: z.array(ContentBlockSchema).optional(),
  highlights: z.array(ContentBlockSchema).optional(),
});

export type ProjectEntry = z.infer<typeof ProjectSchema>;

// Schema für Skills
export const SkillSchema = z.object({
  id: z.string().optional(),
  index: z.string().optional(),
  title: z.string(),
  tabs: z.array(z.string()).optional(),
  description: z.string().optional(),
  skills: z.array(z.string()),
  isPlaceholder: z.boolean().optional(),
});

export type SkillEntry = z.infer<typeof SkillSchema>;

// Schema für Dokumente (Markdown)
export const DocumentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export type DocumentEntry = z.infer<typeof DocumentSchema>;

// Collection-Definitionen
const projects = defineCollection({
  loader: file('src/content/projects/projects.json'),
  schema: ProjectSchema,
});

const skills = defineCollection({
  loader: file('src/content/skills/skills.json', {
    parser: (text: string) => {
      const items = JSON.parse(text);
      if (Array.isArray(items)) {
        return items.map((item: Record<string, unknown>) => ({
          id: (item.index ?? item.title) as string,
          ...item,
        }));
      }
      return items;
    },
  }),
  schema: SkillSchema,
});

const documents = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/documents' }),
  schema: DocumentSchema,
});

export const collections = {
  projects,
  skills,
  documents,
};
