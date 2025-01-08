import { z } from 'zod'

export const createEntity = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
  additionalInfo: z.record(z.unknown()),
})

export const updateEntity = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
  additionalInfo: z.record(z.unknown()),
})
