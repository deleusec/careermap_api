import { z } from 'zod'

export const createCategory = z.object({
  name: z.string(),
  description: z.string(),
})

export const updateCategory = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
})
