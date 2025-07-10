import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Blog } from './Blog'
import { Quiz } from './Quiz'
import { QuizAttempt } from './QuizAttempts'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role enum'
})

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  email: string

  @Field()
  @Column()
  username: string

  @Field()
  @Column()
  firstName: string

  @Field()
  @Column()
  lastName: string

  @Column()
  password: string // Not exposed in GraphQL

  @Field(() => UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole

  @Field()
  @Column({ default: true })
  isActive: boolean

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  // Relations
  @Field(() => [Blog])
  @OneToMany(() => Blog, blog => blog.author)
  blogs: Blog[]

  @Field(() => [Quiz])
  @OneToMany(() => Quiz, quiz => quiz.author)
  quizzes: Quiz[]

  @Field(() => [QuizAttempt])
  @OneToMany(() => QuizAttempt, attempt => attempt.user)
  quizAttempts: QuizAttempt[]
}
