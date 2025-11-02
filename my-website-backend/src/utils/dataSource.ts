import dotenv from 'dotenv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.ENABLE_LOGGING === 'true',
  // entities: [User, Blog, Quiz, Question, QuizAttempt, Answer],
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts']
})
