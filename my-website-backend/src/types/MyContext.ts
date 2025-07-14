import { UserRole } from '../entities/User'

export interface MyContext {
  payload?: {
    userId: string
    role: UserRole
  }
}
