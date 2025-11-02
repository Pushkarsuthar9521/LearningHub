import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { Answer } from '../../entities/Answer'
import { Question } from '../../entities/Question'
import { Quiz } from '../../entities/Quiz'
import { MyContext } from '../../types/MyContext'
import { QuestionInput, QuizInput } from '../../types/QuizInput'

@Resolver()
export class QuizResolver {
  @Query(() => [Quiz])
  async getQuizzes(): Promise<Quiz[]> {
    return await Quiz.find({
      relations: ['author', 'questions', 'questions.answers']
    })
  }

  @Query(() => Quiz, { nullable: true })
  async getQuiz(@Arg('id', () => ID) id: string): Promise<Quiz | null> {
    return await Quiz.findOne({
      where: { id },
      relations: ['author', 'questions', 'questions.answers']
    })
  }

  @Authorized()
  @Mutation(() => Quiz)
  async createQuiz(
    @Arg('input') input: QuizInput,
    @Arg('questions', () => [QuestionInput]) questions: QuestionInput[],
    @Ctx() { payload }: MyContext
  ): Promise<Quiz> {
    const quiz = Quiz.create({
      ...input,
      authorId: payload?.userId,
      totalQuestions: questions.length
    })
    await quiz.save()

    // Create questions and answers
    for (const qInput of questions) {
      const question = Question.create({
        ...qInput,
        quizId: quiz.id
      })
      await question.save()

      for (const aInput of qInput.answers) {
        const answer = Answer.create({
          ...aInput,
          questionId: question.id
        })
        await answer.save()
      }
    }

    return (await Quiz.findOne({
      where: { id: quiz.id },
      relations: ['author', 'questions', 'questions.answers']
    })) as Quiz
  }

  @Authorized()
  @Mutation(() => Quiz, { nullable: true })
  async updateQuiz(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: QuizInput,
    @Ctx() { payload }: MyContext
  ): Promise<Quiz | null> {
    const quiz = await Quiz.findOne({
      where: { id, authorId: payload?.userId }
    })
    if (!quiz) return null

    Object.assign(quiz, input)
    await quiz.save()
    return quiz
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteQuiz(
    @Arg('id', () => ID) id: string,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    const quiz = await Quiz.findOne({
      where: { id, authorId: payload?.userId }
    })
    if (!quiz) return false

    await quiz.remove()
    return true
  }
}
