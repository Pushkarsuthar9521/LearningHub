import { config } from 'dotenv'
import { z } from 'zod'

// Load .env file
config()

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().min(1).default(3012),
  DATABASE_URL: z.string().min(1),

  // Optional variables
  REDIS_URL: z.string().optional(),
  JWT_SECRET: z.string().min(32),

  // CORS variables
  CORS_ORIGIN: z.string().optional(),

  // Boolean variables
  ENABLE_LOGGING: z.coerce.boolean().default(false),

  // API Keys (optional)
  OPENAI_API_KEY: z.string().min(1).optional(),
  STRIPE_SECRET_KEY: z.string().min(1).optional(),

  // Cloudinary
  CLOUDINARY_URL: z.string().min(1).optional(),

  // JWT configuration

  // Email config
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional()
})

// Parse and validate environment variables
const parseEnv = () => {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    console.error('❌ Invalid environment variables:')
    console.error(result.error.flatten().fieldErrors)
    process.exit(1)
  }

  return result.data
}

// Export validated environment
export const env = parseEnv()
