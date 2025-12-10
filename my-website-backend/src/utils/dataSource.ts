import dotenv from 'dotenv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from './env'

dotenv.config()

// Use different paths for development (TypeScript) vs production (compiled JavaScript)
const isDevelopment = env.NODE_ENV === 'development'
const entityPath = isDevelopment
  ? 'src/entities/**/*.ts'
  : 'dist/entities/**/*.js'
const migrationPath = isDevelopment
  ? 'src/migrations/**/*.ts'
  : 'dist/migrations/**/*.js'
const subscriberPath = isDevelopment
  ? 'src/subscribers/**/*.ts'
  : 'dist/subscribers/**/*.js'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: env.DATABASE_URL,
  synchronize: env.DB_SYNCHRONIZE, // Only auto-sync in development
  logging: env.ENABLE_LOGGING,
  entities: [entityPath],
  migrations: [migrationPath],
  subscribers: [subscriberPath],
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})
