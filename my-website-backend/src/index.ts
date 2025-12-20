import 'reflect-metadata'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import express from 'express'
import http from 'http'
import { buildSchema } from 'type-graphql'

import { BlogResolver } from './graphql/resolvers/blogResolver'
import { HelloResolver } from './graphql/resolvers/helloResolver'
import { QuizAttemptResolver } from './graphql/resolvers/quizAttemptsResolver'
import { QuizResolver } from './graphql/resolvers/quizResolver'
import { UserResolver } from './graphql/resolvers/userResolver'

import { authMiddleware } from './auth/authMiddleware'
import { MyContext } from './types/MyContext'
import uploadRoutes from './upload/upload.routes'
import { authChecker } from './utils/authChecker'
import { AppDataSource } from './utils/dataSource'
import { env } from './utils/env'

const main = async () => {
  await AppDataSource.initialize()

  const app = express()
  const httpServer = http.createServer(app)
  const PORT = env.PORT

  const schema = await buildSchema({
    resolvers: [
      HelloResolver,
      UserResolver,
      BlogResolver,
      QuizResolver,
      QuizAttemptResolver
    ],
    authChecker
  })

  const apolloServer = new ApolloServer<MyContext>({
    schema
  })

  await apolloServer.start()

  app.use(
    cors<cors.CorsRequest>({
      origin: env.CORS_ORIGIN,
      credentials: true
    })
  )

  app.use(authMiddleware)

  app.use('/upload', uploadRoutes)

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({
        payload: (req as any).payload
      })
    })
  )

  app.get('/health-check', (_, res) => {
    res.json({ health: 'ok' })
  })

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))

  console.info(`🚀 Server running at http://localhost:${PORT}/graphql`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
