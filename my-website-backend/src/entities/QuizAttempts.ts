import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, Float, ID, Int, ObjectType } from 'type-graphql'

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
import { Quiz } from './Quiz'
import { User } from './User'

@ObjectType()
@Entity('quiz_attempts')
export class QuizAttempt extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => Int)
  @Column()
  score: number

  @Field(() => Int)
  @Column()
  totalQuestions!: number

  @Field(() => Int)
  @Column()
  correctAnswers: number

  @Field(() => Float)
  @Column('decimal', { precision: 5, scale: 2 })
  percentage: number

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  timeSpent: number // in seconds

  @Field(() => GraphQLJSONObject)
  @Column({ type: 'jsonb' })
  userAnswers: Record<string, string> // questionId -> answerId

  @Field()
  @Column({ default: false })
  isCompleted: boolean

  @Field()
  @CreateDateColumn()
  startedAt: Date

  @Field({ nullable: true })
  @Column({ nullable: true })
  completedAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  // Relations
  @Field(() => User)
  @ManyToOne(() => User, user => user.quizAttempts)
  @JoinColumn({ name: 'userId' })
  user: User

  @Column('uuid')
  userId: string

  @Field(() => Quiz)
  @ManyToOne(() => Quiz, quiz => quiz.attempts)
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz

  @Column('uuid')
  quizId: string
}
