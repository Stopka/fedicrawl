import { z } from 'zod'

export const avatarSchema = z.optional(
  z.nullable(
    z.object({
      path: z.string()
    })
  )
)

export type Avatar = z.infer<typeof avatarSchema>
