import bcrypt from 'bcryptjs'
import { Arg, Authorized, ID, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../../entities/User'
import { UserInput } from '../../types/UserInput'

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await User.find()
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg('id', () => ID) id: string): Promise<User | null> {
    return await User.findOne({ where: { id } })
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: UserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(input.password, 10)
    const user = User.create({ ...input, password: hashedPassword })
    await user.save()
    return user
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
