import { z } from 'zod'

export const createRelation = z.object({
  parentId: z.number(),
  childId: z.number(),
  relationType: z.enum(['prerequisite', 'specialization', 'alternative', 'optional', 'recommended']),
})
