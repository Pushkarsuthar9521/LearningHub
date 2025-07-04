import dotenv from 'dotenv'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'blog_quiz_db',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  // entities: [User, Blog, Quiz, Question, QuizAttempt, Answer],
  entities: [],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts']
})
