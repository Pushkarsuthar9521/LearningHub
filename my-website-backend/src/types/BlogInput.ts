import { IsOptional, MaxLength, MinLength } from 'class-validator'
import { Field, ID, InputType } from 'type-graphql'
import { BlogStatus } from '../entities/Blog'

@InputType()
export class CreateBlogInput {
  @Field()
  @MinLength(5)
  @MaxLength(200)
  title: string

  @Field()
  @MinLength(10)
  content: string

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(300)
  excerpt?: string

  @Field({ nullable: true })
  @IsOptional()
  featuredImage?: string

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[]

  @Field()
  category: string

  @Field(() => BlogStatus, { defaultValue: BlogStatus.DRAFT })
  status: BlogStatus
}

@InputType()
export class UpdateBlogInput {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(5)
  @MaxLength(200)
  title?: string

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(10)
  content?: string

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(300)
  excerpt?: string

  @Field({ nullable: true })
  @IsOptional()
  featuredImage?: string

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[]

  @Field({ nullable: true })
  @IsOptional()
  category?: string

  @Field(() => BlogStatus, { nullable: true })
  @IsOptional()
  status?: BlogStatus
}

@InputType()
export class BlogFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  category?: string

  @Field(() => [String], { nullable: true })
  @IsOptional()
  tags?: string[]

  @Field(() => BlogStatus, { nullable: true })
  @IsOptional()
  status?: BlogStatus

  @Field({ nullable: true })
  @IsOptional()
  search?: string

  @Field({ nullable: true })
  @IsOptional()
  authorId?: string
}
