import dotenv from 'dotenv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

dotenv.config()

// Use different paths for development (TypeScript) vs production (compiled JavaScript)
const isDevelopment = process.env.NODE_ENV === 'development'
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
  url: process.env.DATABASE_URL,
  synchronize: isDevelopment, // Only auto-sync in development
  logging: process.env.ENABLE_LOGGING === 'true',
  entities: [entityPath],
  migrations: [migrationPath],
  subscribers: [subscriberPath]
})
