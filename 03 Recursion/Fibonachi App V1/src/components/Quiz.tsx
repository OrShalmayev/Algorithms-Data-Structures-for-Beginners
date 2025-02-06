import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is the base case for the Fibonacci sequence?",
    options: [
      "n = 0 or n = 1",
      "n < 0",
      "n = 2",
      "There is no base case"
    ],
    correctAnswer: 0,
    explanation: "The base cases for Fibonacci are when n ≤ 1, where fib(0) = 0 and fib(1) = 1."
  },
  {
    id: 2,
    text: "Why do we need two recursive calls in the Fibonacci function?",
    options: [
      "To make it run faster",
      "Because each number is the sum of the previous two numbers",
      "To avoid stack overflow",
      "It's optional, we could use one"
    ],
    correctAnswer: 1,
    explanation: "Each Fibonacci number is calculated by adding the previous two numbers in the sequence, hence requiring two recursive calls."
  },
  {
    id: 3,
    text: "What is the time complexity of a naive recursive Fibonacci implementation?",
    options: [
      "O(n)",
      "O(log n)",
      "O(2^n)",
      "O(n^2)"
    ],
    correctAnswer: 2,
    explanation: "The naive recursive implementation has exponential time complexity O(2^n) because each call branches into two recursive calls."
  }
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quiz Complete!</h2>
        <p className="text-lg mb-4">
          Your score: {score} out of {questions.length}
        </p>
        <button
          onClick={resetQuiz}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quiz</h2>
        <span className="text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <div className="space-y-6">
        <p className="text-lg text-gray-700">{questions[currentQuestion].text}</p>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                showExplanation
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-100 text-green-700'
                    : selectedAnswer === index
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-50 text-gray-500'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center">
                {showExplanation && (
                  <span className="mr-2">
                    {index === questions[currentQuestion].correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : selectedAnswer === index ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <HelpCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </span>
                )}
                {option}
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-blue-700 font-semibold mb-2">Explanation:</h4>
              <p className="text-blue-600">
                {questions[currentQuestion].explanation}
              </p>
            </div>
            {currentQuestion < questions.length - 1 && (
              <button
                onClick={nextQuestion}
                className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Next Question
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;