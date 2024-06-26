import { z } from 'zod'

export const FormDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phoneNo: z.string().min(1, 'Phone Number is required'),
})
