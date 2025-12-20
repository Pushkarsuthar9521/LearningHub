import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { MyContext } from '../types/MyContext'
import { env } from '../utils/env'

/**
 * Attaches `payload` to request if JWT is valid
 * Does NOT block the request (GraphQL handles auth via authChecker)
 */
export const authMiddleware = (
  req: Request & { payload?: MyContext['payload'] },
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return next()
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return next()
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as MyContext['payload']

    req.payload = payload
  } catch (err) {
    console.warn('Invalid JWT token')
  }

  next()
}
