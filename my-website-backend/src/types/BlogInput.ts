import { InputType, Field } from 'type-graphql'
import { BlogStatus } from '../entities/Blog'

@InputType()
export class BlogInput {
  @Field()
  title: string

  @Field()
  content: string

  @Field({ nullable: true })
  excerpt?: string

  @Field({ nullable: true })
  featuredImage?: string

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field()
  category: string

  @Field(() => BlogStatus, { nullable: true })
  status?: BlogStatus
}