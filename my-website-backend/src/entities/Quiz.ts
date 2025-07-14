import { Field, ID, Int, ObjectType, registerEnumType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Question } from './Question'
import { QuizAttempt } from './QuizAttempts'
import { User } from './User'

export enum QuizDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export enum QuizStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

registerEnumType(QuizDifficulty, {
  name: 'QuizDifficulty',
  description: 'Quiz difficulty levels'
})

registerEnumType(QuizStatus, {
  name: 'QuizStatus',
  description: 'Quiz status enum'
})

@ObjectType()
@Entity('quizzes')
export class Quiz extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  title: string

  @Field()
  @Column({ unique: true })
  slug: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  description: string

  @Field()
  @Column()
  category: string

  @Field(() => QuizDifficulty)
  @Column({
    type: 'enum',
    enum: QuizDifficulty,
    default: QuizDifficulty.EASY
  })
  difficulty: QuizDifficulty

  @Field(() => QuizStatus)
  @Column({
    type: 'enum',
    enum: QuizStatus,
    default: QuizStatus.DRAFT
  })
  status: QuizStatus

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  timeLimit: number // in minutes

  @Field(() => Int)
  @Column({ default: 0 })
  totalAttempts: number

  @Field(() => Int)
  @Column({ default: 0 })
  totalQuestions: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  featuredImage: string

  @Field(() => [String])
  @Column('simple-array', { nullable: true })
  tags: string[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  // Relations
  @Field(() => User)
  @ManyToOne(() => User, user => user.quizzes)
  @JoinColumn({ name: 'authorId' })
  author: User

  @Column('uuid')
  authorId: string

  @Field(() => [Question])
  @OneToMany(() => Question, question => question.quiz, { cascade: true })
  questions: Question[]

  @Field(() => [QuizAttempt])
  @OneToMany(() => QuizAttempt, attempt => attempt.quiz)
  attempts: QuizAttempt[]
}
