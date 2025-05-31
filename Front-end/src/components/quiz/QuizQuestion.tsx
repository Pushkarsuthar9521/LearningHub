import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import Button from '../ui/Button';
import { QuizQuestion as QuizQuestionType } from '../../types';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedOption: number) => void;
  showResult: boolean;
  userAnswer: number | null;
  onNext: () => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showResult,
  userAnswer,
  onNext,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(userAnswer);

  const handleOptionSelect = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    onAnswer(index);
  };

  const getOptionClassName = (index: number) => {
    let className = "flex p-4 mb-3 border rounded-lg transition-all duration-200 cursor-pointer ";
    
    if (selectedOption === index) {
      className += "border-2 ";
      
      if (showResult) {
        className += index === question.correctAnswer 
          ? "border-green-500 bg-green-50" 
          : "border-red-500 bg-red-50";
      } else {
        className += "border-blue-500 bg-blue-50";
      }
    } else if (showResult && index === question.correctAnswer) {
      className += "border-green-500 bg-green-50";
    } else {
      className += "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
    }
    
    return className;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Multiple Choice
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{question.question}</h3>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOptionSelect(index)}
            className={getOptionClassName(index)}
          >
            <div className="flex-grow">
              <span className="text-gray-800">{option}</span>
            </div>
            {showResult && index === question.correctAnswer && (
              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
            )}
            {showResult && selectedOption === index && index !== question.correctAnswer && (
              <XCircle className="h-5 w-5 text-red-500 ml-2" />
            )}
          </motion.div>
        ))}
      </div>

      {showResult && question.explanation && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Explanation</h4>
          <p className="text-blue-700 text-sm">{question.explanation}</p>
        </div>
      )}

      <div className="flex justify-between">
        {!showResult ? (
          <Button
            variant="primary"
            onClick={() => onAnswer(selectedOption !== null ? selectedOption : 0)}
            disabled={selectedOption === null}
          >
            Check Answer
          </Button>
        ) : (
          <Button variant="primary" onClick={onNext}>
            Next Question
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;