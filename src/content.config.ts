import { z, defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
	schema: () =>
		z.object({
			title: z.string(),
			pubDate: z.date(),
			author: z.string(),
			description: z.string(),
			image: z.string().optional(),
			thumbnail: z.string().optional()
		})
})

const portfolio = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/portfolio' }),
	schema: () =>
		z.object({
			title: z.string(),
			client: z.string(),
			pubDate: z.date(),
			description: z.string(),
			challenge: z.string(),
			solution: z.string(),
			results: z.array(z.string()),
			image: z.string().optional(),
			thumbnail: z.string().optional()
		})
})

export const collections = {
	blog,
	portfolio
}
