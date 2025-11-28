import { Award, Book, Clock, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { truncateText } from '../../lib/utils'
import Button from '../ui/Button'
import { Card, CardContent } from '../ui/Card'

interface Author {
  id: string
  username: string
  email?: string
  firstName?: string
  lastName?: string
}

interface QuizCardQuiz {
  id: string
  title: string
  slug: string
  description?: string | null
  category: string
  difficulty: string
  timeLimit?: number | null
  totalQuestions: number
  featuredImage?: string | null
  tags?: string[]
  author?: Author
}

interface QuizCardProps {
  quiz: QuizCardQuiz
  variant?: 'default' | 'featured' | 'compact'
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <Card
        className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
        hoverable
      >
        <div className="md:flex">
          <div className="md:w-2/5 h-56 md:h-auto relative">
            <img
              src={quiz.featuredImage || 'https://via.placeholder.com/400x300'}
              alt={quiz.title}
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </div>
          </div>
          <div className="md:w-3/5 p-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {quiz.author?.username || 'Unknown'}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Book className="h-4 w-4 mr-1" />
                {quiz.totalQuestions} questions
              </span>
            </div>
            <Link to={`/quizzes/${quiz.slug}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {quiz.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {quiz.timeLimit && (
                <span className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1 text-purple-600" />
                  {quiz.timeLimit} min
                </span>
              )}
              <span className="flex items-center text-sm text-gray-600">
                <Award className="h-4 w-4 mr-1 text-purple-600" />
                {quiz.difficulty}
              </span>
            </div>
            <Link to={`/quizzes/${quiz.slug}`}>
              <Button variant="secondary" className="mt-2">
                Go to Quiz
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    )
  }

  if (variant === 'compact') {
    return (
      <Card
        className="hover:shadow-md transition-shadow duration-300"
        hoverable
      >
        <CardContent className="p-4">
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <Book className="h-3 w-3 mr-1" />
            {quiz.totalQuestions} questions
          </div>
          <Link to={`/quizzes/${quiz.slug}`}>
            <h3 className="text-base font-medium text-gray-900 hover:text-purple-600 transition-colors">
              {truncateText(quiz.title, 60)}
            </h3>
          </Link>
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
      hoverable
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={quiz.featuredImage || 'https://via.placeholder.com/400x300'}
          alt={quiz.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {quiz.author?.username || 'Unknown'}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Book className="h-4 w-4 mr-1" />
            {quiz.totalQuestions} questions
          </span>
        </div>
        <Link to={`/quizzes/${quiz.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
            {quiz.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4">
          {truncateText(quiz.description || '', 100)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              {quiz.category}
            </span>
            {quiz.tags &&
              quiz.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
          </div>
          {quiz.timeLimit && (
            <span className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1 text-purple-600" />
              {quiz.timeLimit} min
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default QuizCard
