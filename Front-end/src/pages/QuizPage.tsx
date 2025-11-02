import { ArrowLeft, Book, Check, Clock, User, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import QuizQuestion from '../components/quiz/QuizQuestion'
import Button from '../components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../components/ui/Card'
import useQuizStore from '../store/quizStore'
import { Quiz, QuizAttempt } from '../types'

const QuizPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { fetchQuizBySlug, submitQuizAttempt } = useQuizStore()

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [started, setStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const loadQuiz = async () => {
      if (slug) {
        setLoading(true)
        const fetchedQuiz = await fetchQuizBySlug(slug)
        if (fetchedQuiz) {
          setQuiz(fetchedQuiz)
          document.title = `Quiz: ${fetchedQuiz.title}`

          // Initialize answers array
          setUserAnswers(new Array(fetchedQuiz.questions.length).fill(-1))

          // Set time if there's a time limit
          if (fetchedQuiz.timeLimit) {
            setTimeLeft(fetchedQuiz.timeLimit * 60) // convert to seconds
          }
        }
        setLoading(false)
      }
    }

    loadQuiz()
  }, [slug, fetchQuizBySlug])

  // Timer effect
  useEffect(() => {
    if (!started || timeLeft === null || quizCompleted) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up
          clearInterval(timer)
          finishQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [started, timeLeft, quizCompleted])

  const startQuiz = () => {
    setStarted(true)
    setCurrentQuestionIndex(0)
    setUserAnswers(new Array(quiz?.questions.length || 0).fill(-1))
    setQuizCompleted(false)
    setShowResult(false)
    setScore(0)
  }

  const handleAnswer = (selectedOption: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = selectedOption
    setUserAnswers(newAnswers)
    setShowResult(true)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setShowResult(false)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = () => {
    if (!quiz) return

    // Calculate score
    let correctAnswers = 0
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const finalScore = Math.round(
      (correctAnswers / quiz.questions.length) * 100
    )
    setScore(finalScore)

    // Submit quiz attempt
    const attempt: Omit<QuizAttempt, 'id' | 'completedAt'> = {
      quizId: quiz.id,
      userId: '1', // Using mock user ID for demo
      answers: userAnswers,
      score: finalScore,
      timeSpent: quiz.timeLimit ? quiz.timeLimit * 60 - (timeLeft || 0) : 0
    }

    submitQuizAttempt(attempt)
    setQuizCompleted(true)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  if (loading) {
    return (
      <>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!quiz) {
    return (
      <>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Quiz Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The quiz you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/quizzes"
              className="inline-flex items-center text-purple-600 hover:text-purple-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quizzes
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {!started ? (
            <Card>
              <div className="md:flex">
                <div className="md:w-2/5 h-48 md:h-auto relative">
                  <img
                    src={quiz.coverImage}
                    alt={quiz.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6">
                  <CardHeader className="p-0 border-none mb-4">
                    <CardTitle className="text-2xl font-bold">
                      {quiz.title}
                    </CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="flex items-center text-sm text-gray-600">
                        <Book className="h-4 w-4 mr-1 text-purple-600" />
                        {quiz.questions.length} questions
                      </span>
                      {quiz.timeLimit && (
                        <span className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1 text-purple-600" />
                          {quiz.timeLimit} min
                        </span>
                      )}
                      <span className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-1 text-purple-600" />
                        By {quiz.author.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {quiz.categories.map(category => (
                        <span
                          key={category.id}
                          className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="secondary"
                      onClick={startQuiz}
                      className="w-full sm:w-auto"
                    >
                      Start Quiz
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ) : quizCompleted ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-16 h-16" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200 stroke-current"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      ></circle>
                      <circle
                        className="text-purple-600 stroke-current"
                        strokeWidth="10"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${
                          2 * Math.PI * 40 * (1 - score / 100)
                        }`}
                        transform="rotate(-90 50 50)"
                      ></circle>
                      <text
                        x="50"
                        y="50"
                        fontFamily="sans-serif"
                        fontSize="20"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fill="currentColor"
                      >
                        {score}%
                      </text>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Quiz Completed!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    You scored {score}% (
                    {
                      userAnswers.filter(
                        (answer, index) =>
                          answer === quiz.questions[index].correctAnswer
                      ).length
                    }{' '}
                    out of {quiz.questions.length} correct)
                  </p>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Your Answers
                    </h3>
                    <div className="space-y-3 max-w-md mx-auto">
                      {quiz.questions.map((question, index) => (
                        <div key={index} className="flex items-start text-left">
                          <div className="flex-shrink-0">
                            {userAnswers[index] === question.correctAnswer ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-800">
                              {question.question}
                            </p>
                            <p className="text-xs text-gray-600">
                              Your answer:{' '}
                              {userAnswers[index] >= 0
                                ? question.options[userAnswers[index]]
                                : 'Not answered'}
                            </p>
                            {userAnswers[index] !== question.correctAnswer && (
                              <p className="text-xs text-green-600">
                                Correct answer:{' '}
                                {question.options[question.correctAnswer]}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/quizzes')}
                    >
                      Browse More Quizzes
                    </Button>
                    <Button variant="secondary" onClick={startQuiz}>
                      Try Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              {/* Quiz Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Question {currentQuestionIndex + 1} of{' '}
                    {quiz.questions.length}
                  </span>
                  {timeLeft !== null && (
                    <span
                      className={`text-sm font-medium ${
                        timeLeft < 30 ? 'text-red-600' : 'text-gray-700'
                      }`}
                    >
                      Time remaining: {formatTime(timeLeft)}
                    </span>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / quiz.questions.length) *
                        100
                      }%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Current Question */}
              <QuizQuestion
                question={quiz.questions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={quiz.questions.length}
                onAnswer={handleAnswer}
                showResult={showResult}
                userAnswer={userAnswers[currentQuestionIndex]}
                onNext={nextQuestion}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default QuizPage
