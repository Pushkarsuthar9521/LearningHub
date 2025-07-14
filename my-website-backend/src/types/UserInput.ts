import { InputType, Field } from 'type-graphql'
import { UserRole } from '../entities/User'

@InputType()
export class UserInput {
  @Field()
  email: string

  @Field()
  username: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  password: string

  @Field(() => UserRole, { nullable: true })
  role?: UserRole
}
