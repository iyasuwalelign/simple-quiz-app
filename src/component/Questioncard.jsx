import { useState } from 'react';
import Data from '../Data';

export const Question = () => {
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);

  const questionData = Data.results[currentQuestionIndex];
  const options = [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5);

  const handleClick = (option, index) => {
    setClickedIndex(index);
    setShowFeedback(true);
    if (option === questionData.correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setClickedIndex(null);
    setShowFeedback(false);
    if (currentQuestionIndex < Data.results.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return <div className="text-center text-white">Quiz Finished! Final Score: {score}</div>;
  }

  return (
    <div className='bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-xl border border-gray-700'>
      <h2 className="text-white">Score: {score}</h2>
      <p className="text-white">Question {currentQuestionIndex + 1} of {Data.results.length}</p>
      <p className='mb-4 text-white'>{questionData.question}</p>

      <div className='grid gap-3'>
        {options.map((option, index) => {
          let bgColor = 'bg-blue-700';
          if (showFeedback) {
            if (option === questionData.correct_answer) bgColor = 'bg-green-600';
            else if (index === clickedIndex) bgColor = 'bg-red-600';
          }
          return (
            <button
              key={index}
              disabled={showFeedback}
              onClick={() => handleClick(option, index)}
              className={`text-left px-4 py-3 cursor-pointer ${bgColor} rounded-lg text-white`}
            >
              {option}
            </button>
          );
        })}

        {showFeedback && (
          <button
            onClick={handleNext}
            className="cursor-pointer mt-4 w-full px-4 py-3 bg-green-600 rounded-lg text-white"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};