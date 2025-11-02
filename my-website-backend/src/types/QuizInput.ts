import { Field, InputType, Int } from 'type-graphql'
import { QuizDifficulty, QuizStatus } from '../entities/Quiz'

@InputType()
export class QuizInput {
  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field()
  category: string

  @Field(() => QuizDifficulty, { nullable: true })
  difficulty?: QuizDifficulty

  @Field(() => QuizStatus, { nullable: true })
  status?: QuizStatus

  @Field(() => Int, { nullable: true })
  timeLimit?: number

  @Field({ nullable: true })
  featuredImage?: string

  @Field(() => [String], { nullable: true })
  tags?: string[]
}

@InputType()
export class QuestionInput {
  @Field()
  questionText: string

  @Field({ nullable: true })
  explanation?: string

  @Field(() => Int, { nullable: true })
  orderIndex?: number

  @Field(() => Int, { nullable: true })
  points?: number

  @Field({ nullable: true })
  imageUrl?: string

  @Field(() => [AnswerInput])
  answers: AnswerInput[]
}

@InputType()
export class AnswerInput {
  @Field()
  answerText: string

  @Field()
  isCorrect: boolean

  @Field(() => Int, { nullable: true })
  orderIndex?: number

  @Field({ nullable: true })
  explanation?: string
}
