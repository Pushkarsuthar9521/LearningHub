import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import express from 'express'
import http from 'http'
import jwt from 'jsonwebtoken'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { BlogResolver } from './graphql/resolvers/blogResolver'
import { HelloResolver } from './graphql/resolvers/helloResolver'
import { ImageUploadResolver } from './graphql/resolvers/imageUploadResolver'
import { QuizAttemptResolver } from './graphql/resolvers/quizAttemptsResolver'
import { QuizResolver } from './graphql/resolvers/quizResolver'
import { UserResolver } from './graphql/resolvers/userResolver'
import { MyContext } from './types/MyContext'
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
      QuizAttemptResolver,
      ImageUploadResolver
    ],
    authChecker
  })

  const apolloServer = new ApolloServer<MyContext>({
    schema
  })

  await apolloServer.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: env.CORS_ORIGIN,
      credentials: true
    }),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(' ')?.[1]
        if (token) {
          try {
            const payload = jwt.verify(
              token,
              env.JWT_SECRET
            ) as MyContext['payload']
            return { payload }
          } catch (err) {
            console.error('Invalid token')
          }
        }
        return {}
      }
    })
  )

  app.get('/health-check', (_, res) => {
    res.json({ health: 'ok' })
    return
  })

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
  console.info(`Server is running on http://localhost:${PORT}/graphql`)
}

main()
