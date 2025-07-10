import 'reflect-metadata';
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import express, { Response } from 'express'
import http from 'http'
import { buildSchema } from 'type-graphql'
import { HelloResolver } from './graphql/resolvers/helloResolver'
import { AppDataSource } from './utils/dataSource'
import { env } from './utils/env'

const main = async () => {
  await AppDataSource.initialize()
  const app = express()
  const httpServer = http.createServer(app)
  const PORT = env.PORT

  const schema = await buildSchema({
    resolvers: [HelloResolver]
  })

  const apolloServer = new ApolloServer({
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
    expressMiddleware(apolloServer)
  )

  app.get('/', (_, res: Response) => {
    res.send('Hello, Ai')
  })

  app.get('/health-check', (_, res) => {
    res.json({ health: 'ok' })
    return
  })

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
  console.info(`Server is running on http://localhost:${PORT}/graphql`)
}

main()
