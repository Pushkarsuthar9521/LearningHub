import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver
} from 'type-graphql'
import { Quiz } from '../../entities/Quiz'
import { QuizAttempt } from '../../entities/QuizAttempts'
import { User } from '../../entities/User'
import { MyContext } from '../../types/MyContext'
import { QuizAttemptInput } from '../../types/QuizAttemptInput'

@Resolver()
export class QuizAttemptResolver {
  // Query: Get all quiz attempts for a specific user
  @Authorized()
  @Query(() => [QuizAttempt])
  async getQuizAttemptsByUserId(
    @Arg('userId', () => ID) userId: string,
    @Ctx() { payload }: MyContext
  ): Promise<QuizAttempt[]> {
    // Users can only fetch their own attempts, admins can fetch anyone's
    if (payload?.userId !== userId) {
      const user = await User.findOne({ where: { id: payload?.userId } })
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized to access these quiz attempts')
      }
    }

    return await QuizAttempt.find({
      where: { userId },
      relations: ['quiz', 'user'],
      order: { startedAt: 'DESC' }
    })
  }

  // Query: Get all quiz attempts for the current logged-in user
  @Authorized()
  @Query(() => [QuizAttempt])
  async getMyQuizAttempts(
    @Ctx() { payload }: MyContext
  ): Promise<QuizAttempt[]> {
    if (!payload?.userId) {
      throw new Error('Not authenticated')
    }

    return await QuizAttempt.find({
      where: { userId: payload.userId },
      relations: ['quiz', 'user'],
      order: { startedAt: 'DESC' }
    })
  }

  // Query: Get a specific quiz attempt by ID
  @Authorized()
  @Query(() => QuizAttempt, { nullable: true })
  async getQuizAttemptById(
    @Arg('id', () => ID) id: string,
    @Ctx() { payload }: MyContext
  ): Promise<QuizAttempt | null> {
    const attempt = await QuizAttempt.findOne({
      where: { id },
      relations: ['quiz', 'user']
    })

    if (!attempt) return null

    // Users can only view their own attempts, admins can view anyone's
    if (attempt.userId !== payload?.userId) {
      const user = await User.findOne({ where: { id: payload?.userId } })
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized to access this quiz attempt')
      }
    }

    return attempt
  }

  // Query: Get all attempts for a specific quiz
  @Authorized()
  @Query(() => [QuizAttempt])
  async getQuizAttemptsByQuizId(
    @Arg('quizId', () => ID) quizId: string
  ): Promise<QuizAttempt[]> {
    return await QuizAttempt.find({
      where: { quizId },
      relations: ['quiz', 'user'],
      order: { startedAt: 'DESC' }
    })
  }

  // Query: Get user's attempts for a specific quiz
  @Authorized()
  @Query(() => [QuizAttempt])
  async getMyQuizAttemptsByQuizId(
    @Arg('quizId', () => ID) quizId: string,
    @Ctx() { payload }: MyContext
  ): Promise<QuizAttempt[]> {
    if (!payload?.userId) {
      throw new Error('Not authenticated')
    }

    return await QuizAttempt.find({
      where: {
        quizId,
        userId: payload.userId
      },
      relations: ['quiz', 'user'],
      order: { startedAt: 'DESC' }
    })
  }

  // Mutation: Submit/Create a new quiz attempt
  @Authorized()
  @Mutation(() => QuizAttempt)
  async submitQuizAttempt(
    @Arg('input') input: QuizAttemptInput,
    @Ctx() { payload }: MyContext
  ): Promise<QuizAttempt> {
    if (!payload?.userId) {
      throw new Error('Not authenticated')
    }

    // Verify quiz exists
    const quiz = await Quiz.findOne({ where: { id: input.quizId } })
    if (!quiz) {
      throw new Error('Quiz not found')
    }

    // Calculate percentage
    const percentage = (input.correctAnswers / input.totalQuestions) * 100

    // Create the quiz attempt
    const quizAttempt = QuizAttempt.create({
      userId: payload.userId,
      quizId: input.quizId,
      score: input.score,
      totalQuestions: input.totalQuestions,
      correctAnswers: input.correctAnswers,
      percentage: percentage,
      timeSpent: input.timeSpent || 0,
      userAnswers: input.userAnswers,
      isCompleted: input.isCompleted,
      startedAt: new Date()
    })

    if (input.isCompleted) {
      quizAttempt.completedAt = new Date()
    }

    await quizAttempt.save()

    // Update quiz total attempts count
    quiz.totalAttempts += 1
    await quiz.save()

    // Return with relations
    return (await QuizAttempt.findOne({
      where: { id: quizAttempt.id },
      relations: ['quiz', 'user']
    })) as QuizAttempt
  }

  // Mutation: Update an existing quiz attempt (for resuming incomplete attempts)
  @Authorized()
  @Mutation(() => QuizAttempt, { nullable: true })
  async updateQuizAttempt(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: QuizAttemptInput,
    @Ctx() { payload }: MyContext
  ): Promise<QuizAttempt | null> {
    if (!payload?.userId) {
      throw new Error('Not authenticated')
    }

    const quizAttempt = await QuizAttempt.findOne({
      where: { id, userId: payload.userId }
    })

    if (!quizAttempt) {
      throw new Error('Quiz attempt not found or unauthorized')
    }

    // Calculate percentage
    const percentage = (input.correctAnswers / input.totalQuestions) * 100

    // Update the attempt
    Object.assign(quizAttempt, {
      score: input.score,
      totalQuestions: input.totalQuestions,
      correctAnswers: input.correctAnswers,
      percentage: percentage,
      timeSpent: input.timeSpent || quizAttempt.timeSpent,
      userAnswers: input.userAnswers,
      isCompleted: input.isCompleted,
      completedAt: input.isCompleted ? new Date() : quizAttempt.completedAt
    })

    await quizAttempt.save()

    // Return with relations
    return (await QuizAttempt.findOne({
      where: { id: quizAttempt.id },
      relations: ['quiz', 'user']
    })) as QuizAttempt
  }

  // Mutation: Delete a quiz attempt (admin only or own attempts)
  @Authorized()
  @Mutation(() => Boolean)
  async deleteQuizAttempt(
    @Arg('id', () => ID) id: string,
    @Ctx() { payload }: MyContext
  ): Promise<boolean> {
    if (!payload?.userId) {
      throw new Error('Not authenticated')
    }

    const quizAttempt = await QuizAttempt.findOne({
      where: { id },
      relations: ['quiz']
    })

    if (!quizAttempt) {
      return false
    }

    // Check authorization
    if (quizAttempt.userId !== payload.userId) {
      const user = await User.findOne({ where: { id: payload.userId } })
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized to delete this quiz attempt')
      }
    }

    // Decrement quiz total attempts
    const quiz = quizAttempt.quiz
    if (quiz && quiz.totalAttempts > 0) {
      quiz.totalAttempts -= 1
      await quiz.save()
    }

    await quizAttempt.remove()
    return true
  }

  // Query: Get quiz attempt statistics for a user
  @Authorized()
  @Query(() => QuizAttemptStats)
  async getQuizAttemptStats(
    @Arg('userId', () => ID, { nullable: true }) userId: string | null,
    @Ctx() { payload }: MyContext
  ): Promise<QuizAttemptStats> {
    const targetUserId = userId || payload?.userId

    if (!targetUserId) {
      throw new Error('User ID is required')
    }

    // Check authorization
    if (targetUserId !== payload?.userId) {
      const user = await User.findOne({ where: { id: payload?.userId } })
      if (!user || user.role !== 'admin') {
        throw new Error('Unauthorized to access these statistics')
      }
    }

    const attempts = await QuizAttempt.find({
      where: { userId: targetUserId, isCompleted: true }
    })

    const totalAttempts = attempts.length
    const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0)
    const averageScore = totalAttempts > 0 ? totalScore / totalAttempts : 0
    const averagePercentage =
      totalAttempts > 0
        ? attempts.reduce((sum, attempt) => sum + attempt.percentage, 0) /
          totalAttempts
        : 0
    const totalTimeSpent = attempts.reduce(
      (sum, attempt) => sum + (attempt.timeSpent || 0),
      0
    )

    return {
      totalAttempts,
      averageScore,
      averagePercentage,
      totalTimeSpent,
      bestScore:
        totalAttempts > 0 ? Math.max(...attempts.map(a => a.score)) : 0,
      worstScore:
        totalAttempts > 0 ? Math.min(...attempts.map(a => a.score)) : 0
    }
  }
}

// Statistics Object Type
import { Field, Float, Int, ObjectType } from 'type-graphql'

@ObjectType()
class QuizAttemptStats {
  @Field(() => Int)
  totalAttempts: number

  @Field(() => Float)
  averageScore: number

  @Field(() => Float)
  averagePercentage: number

  @Field(() => Int)
  totalTimeSpent: number

  @Field(() => Int)
  bestScore: number

  @Field(() => Int)
  worstScore: number
}
