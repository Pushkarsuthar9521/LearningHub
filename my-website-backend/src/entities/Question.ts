import { Field, ID, Int, ObjectType } from 'type-graphql'
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
import { Answer } from './Answer'
import { Quiz } from './Quiz'

@ObjectType()
@Entity('questions')
export class Question extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column('text')
  questionText: string

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  explanation: string

  @Field(() => Int)
  @Column()
  orderIndex: number

  @Field(() => Int, { defaultValue: 1 })
  @Column({ default: 1 })
  points: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  // Relations
  @Field(() => Quiz)
  @ManyToOne(() => Quiz, quiz => quiz.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz

  @Column('uuid')
  quizId: string

  @Field(() => [Answer])
  @OneToMany(() => Answer, answer => answer.question, { cascade: true })
  answers: Answer[]
}
