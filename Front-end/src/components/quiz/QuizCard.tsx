import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Award, User, Book } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { Quiz } from '../../types';
import { formatDate, truncateText } from '../../lib/utils';

interface QuizCardProps {
  quiz: Quiz;
  variant?: 'default' | 'featured' | 'compact';
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300\" hoverable>
        <div className="md:flex">
          <div className="md:w-2/5 h-56 md:h-auto relative">
            <img 
              src={quiz.coverImage} 
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
                {quiz.author.name}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Book className="h-4 w-4 mr-1" />
                {quiz.questions.length} questions
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
                Beginner
              </span>
            </div>
            <Button 
              variant="secondary" 
              as={Link} 
              to={`/quizzes/${quiz.slug}`}
              className="mt-2"
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-shadow duration-300" hoverable>
        <CardContent className="p-4">
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <Book className="h-3 w-3 mr-1" />
            {quiz.questions.length} questions
          </div>
          <Link to={`/quizzes/${quiz.slug}`}>
            <h3 className="text-base font-medium text-gray-900 hover:text-purple-600 transition-colors">
              {truncateText(quiz.title, 60)}
            </h3>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300" hoverable>
      <div className="h-48 overflow-hidden relative">
        <img 
          src={quiz.coverImage} 
          alt={quiz.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {quiz.author.name}
          </span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <Book className="h-4 w-4 mr-1" />
            {quiz.questions.length} questions
          </span>
        </div>
        <Link to={`/quizzes/${quiz.slug}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
            {quiz.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4">{truncateText(quiz.description, 100)}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {quiz.categories.slice(0, 2).map((category) => (
              <Link 
                key={category.id} 
                to={`/quizzes/category/${category.slug}`}
                className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
              >
                {category.name}
              </Link>
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
  );
};

export default QuizCard;