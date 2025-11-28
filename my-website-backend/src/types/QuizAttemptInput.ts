import { GraphQLJSONObject } from 'graphql-type-json'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class QuizAttemptInput {
  @Field()
  quizId: string

  @Field(() => Int)
  score: number

  @Field(() => Int)
  totalQuestions: number

  @Field(() => Int)
  correctAnswers: number

  @Field(() => Int, { nullable: true })
  timeSpent?: number // in seconds

  @Field(() => GraphQLJSONObject)
  userAnswers: Record<string, string> // questionId -> answerId or answer index

  @Field({ defaultValue: true })
  isCompleted: boolean
}
