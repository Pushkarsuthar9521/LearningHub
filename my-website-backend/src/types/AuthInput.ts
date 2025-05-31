import { IsEmail, MaxLength, MinLength } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'
import { User } from '../entities/User'

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(3)
  @MaxLength(20)
  username: string

  @Field()
  @MinLength(2)
  @MaxLength(50)
  firstName: string

  @Field()
  @MinLength(2)
  @MaxLength(50)
  lastName: string

  @Field()
  @MinLength(6)
  password: string
}

@InputType()
export class LoginInput {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class AuthResponse {
  @Field()
  token: string

  @Field(() => User)
  user: User
}

@ObjectType()
export class AuthPayload {
  @Field()
  success: boolean

  @Field({ nullable: true })
  message?: string

  @Field(() => AuthResponse, { nullable: true })
  data?: AuthResponse
}
