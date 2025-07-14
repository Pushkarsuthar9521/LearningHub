import { Field, ID, Int, ObjectType } from 'type-graphql'
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
import { Question } from './Question'

@ObjectType()
@Entity('answers')
export class Answer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column('text')
  answerText: string

  @Field()
  @Column({ default: false })
  isCorrect: boolean

  @Field(() => Int)
  @Column()
  orderIndex: number

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  explanation: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  // Relations
  @Field(() => Question)
  @ManyToOne(() => Question, question => question.answers, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'questionId' })
  question: Question

  @Column('uuid')
  questionId: string
}
