import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User'

export enum BlogStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

registerEnumType(BlogStatus, {
  name: 'BlogStatus',
  description: 'Blog status enum'
})

@ObjectType()
@Entity('blogs')
export class Blog extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  title: string

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true })
  slug?: string

  @Field()
  @Column('text')
  content: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  excerpt: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  featuredImage: string

  @Field(() => [String])
  @Column('simple-array', { nullable: true })
  tags: string[]

  @Field()
  @Column()
  category: string

  @Field(() => BlogStatus)
  @Column({
    type: 'enum',
    enum: BlogStatus,
    default: BlogStatus.DRAFT
  })
  status: BlogStatus

  @Field()
  @Column({ default: 0 })
  viewCount: number

  @Field()
  @Column({ default: 0 })
  likeCount: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  publishedAt: Date

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  // Relations
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, user => user.blogs)
  @JoinColumn({ name: 'authorId' })
  author?: User

  @Field(() => String, { nullable: true })
  @Column('uuid', { nullable: true })
  authorId?: string
}
