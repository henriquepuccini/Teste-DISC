import React from 'react';
import { Question } from '../types';

interface QuizProps {
  questions: Question[];
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, optionKey: string) => void;
  onSubmit: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, answers, onAnswerChange, onSubmit }) => {
  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Progresso</span>
          <span className="text-sm font-medium text-gray-600">
            {Object.keys(answers).length} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-8">
        {questions.map((question) => (
          <div key={question.id} className="border-b border-gray-200 pb-8 last:border-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {question.id}. {question.text}
            </h3>
            <div className="space-y-3">
              {Object.entries(question.options).map(([key, value]) => (
                <label
                  key={key}
                  className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    answers[question.id] === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={key}
                    checked={answers[question.id] === key}
                    onChange={() => onAnswerChange(question.id, key)}
                    className="mt-1 mr-3"
                  />
                  <span className="text-gray-700">{value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onSubmit}
          disabled={Object.keys(answers).length !== questions.length}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            Object.keys(answers).length === questions.length
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Ver Resultados
        </button>
        {Object.keys(answers).length !== questions.length && (
          <p className="text-sm text-gray-500 mt-2">
            Responda todas as questões para ver seus resultados
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
