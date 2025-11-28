import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { Blog } from '../../entities/Blog'
import { BlogInput } from '../../types/BlogInput'
import { MyContext } from '../../types/MyContext'

@Resolver()
export class BlogResolver {
  @Query(() => [Blog])
  async getBlogs(): Promise<Blog[]> {
    return await Blog.find({ relations: ['author'] })
  }

  @Query(() => Blog, { nullable: true })
  async getBlog(@Arg('id', () => ID) id: string): Promise<Blog | null> {
    return await Blog.findOne({ where: { id }, relations: ['author'] })
  }

  @Query(() => Blog, { nullable: true })
  async getBlogBySlug(@Arg('slug') slug: string): Promise<Blog | null> {
    return await Blog.findOne({ where: { slug }, relations: ['author'] })
  }

  // @Authorized()
  @Authorized()
  @Mutation(() => Blog)
  async createBlog(
    @Arg('input') input: BlogInput,
    @Ctx() { payload }: MyContext
  ): Promise<Blog> {
    const blog = Blog.create({ ...input, authorId: payload?.userId })
    await blog.save()
    return blog
  }

  @Authorized()
  @Mutation(() => Blog, { nullable: true })
  async updateBlog(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: BlogInput,
    @Ctx() { payload }: MyContext
  ): Promise<Blog | null> {
    const blog = await Blog.findOne({
      where: { id, authorId: payload?.userId }
    })
    if (!blog) return null

    Object.assign(blog, input)
    await blog.save()
    return blog
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteBlog(
    @Arg('id', () => ID) id: string,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const blog = await Blog.findOne({
      where: { id, authorId: payload?.userId }
    })
    if (!blog) return false

    await blog.remove()
    return true
  }
}
