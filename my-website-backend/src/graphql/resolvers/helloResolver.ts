import { Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { MyContext } from '../../types/MyContext'

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello world'
  }

  @Authorized()
  @Query(() => String)
  protectedQuery(@Ctx() { payload }: MyContext): string {
    return `Your user id is ${payload?.userId}`
  }
}
