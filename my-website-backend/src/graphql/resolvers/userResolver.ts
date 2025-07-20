import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Arg, Authorized, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../../entities/User'
import {
  AuthResponse,
  LoginInput,
  RegisterInput
} from '../../types/AuthInput'
import { MyContext } from '../../types/MyContext'
import { UserInput } from '../../types/UserInput'
import { env } from '../../utils/env'

@Resolver()
export class UserResolver {
  @Mutation(() => AuthResponse)
  async login(
    @Arg('input') { email, password }: LoginInput,
    @Ctx() { res }: MyContext
  ): Promise<AuthResponse> {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: '1d'
    })

    return { token, user }
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { payload }: MyContext): Promise<User | null> {
    if (!payload?.userId) {
      return null
    }
    return User.findOne({ where: { id: payload.userId } })
  }

  @Authorized()
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await User.find()
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg('id', () => ID) id: string): Promise<User | null> {
    return await User.findOne({ where: { id } })
  }

  @Mutation(() => AuthResponse)
  async register(@Arg('input') input: RegisterInput): Promise<AuthResponse> {
    const existingUser = await User.findOne({ where: { email: input.email } })
    if (existingUser) {
      throw new Error('Email is already in use')
    }

    const hashedPassword = await bcrypt.hash(input.password, 10)
    const user = User.create({ ...input, password: hashedPassword })
    await user.save()

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: '1d'
    })

    return { token, user }
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: UserInput
  ): Promise<User | null> {
    const user = await User.findOne({ where: { id } })
    if (!user) return null

    const hashedPassword = await bcrypt.hash(input.password, 10)
    Object.assign(user, { ...input, password: hashedPassword })
    await user.save()
    return user
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => ID) id: string): Promise<boolean> {
    const user = await User.findOne({ where: { id } })
    if (!user) return false

    await user.remove()
    return true
  }
}
