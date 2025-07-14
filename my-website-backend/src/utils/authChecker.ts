import { AuthChecker } from 'type-graphql'
import { MyContext } from '../types/MyContext'

export const authChecker: AuthChecker<MyContext> = (
  { context: { payload } },
  roles
) => {
  if (!payload) {
    return false
  }

  if (roles.length === 0) {
    return true
  }

  if (roles.includes(payload.role)) {
    return true
  }

  return false
}
