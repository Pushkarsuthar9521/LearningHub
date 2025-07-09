import express, { Response } from 'express'
import { AppDataSource } from './utils/dataSource'
import { env } from './utils/env'
// import { redisClient } from './redisClient'

const main = async () => {
  await AppDataSource.initialize()
  const app = express()
  const PORT = env.PORT
  // app.use(
  //   session({
  //     store: new RedisStore({ client: redisClient }),
  //     secret: process.env.SESSION_SECRET || 'supersecret',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: {
  //       secure: process.env.NODE_ENV === 'production', // Set to true in production (requires HTTPS)
  //       httpOnly: true,
  //       maxAge: Number(process.env.SESSION_TTL) * 1000 // Convert seconds to milliseconds
  //     }
  //   })
  // )
  // let origin: string | string[] = env.CORS_ORIGIN
  // if (origin.includes(',')) origin = origin.split(',')
  // app.use(authSessionMiddleware())
  app.use(express.json())
  // app.use(
  //   cors({
  //     origin,
  //     credentials: true
  //   })
  // )
  app.get('/', (_, res: Response) => {
    res.send('Hello, Ai')
  })

  app.get('/health-check', (_, res) => {
    res.json({ health: 'ok' })
    return
  })
  app.listen(PORT, () => {
    console.info(`Server is running on http://localhost:${PORT}`)
  })
}
main()
