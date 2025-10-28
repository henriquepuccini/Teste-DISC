import React from 'react';
import { type Question } from '../types';

interface QuizProps {
  questions: Question[];
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, optionKey: string) => void;
  onSubmit: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, answers, onAnswerChange, onSubmit }) => {
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <>
      <p className="text-center text-slate-600 mb-8">Responda as questões abaixo escolhendo a que mais se parece com você.</p>
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="border-b border-slate-200 pb-8 last:border-b-0 last:pb-0">
            <p className="text-lg font-semibold text-slate-700 mb-4">
              {`${index + 1}. ${question.text}`}
            </p>
            <div className="space-y-3">
              {Object.entries(question.options).map(([key, value]) => {
                const isSelected = answers[question.id] === key;
                return (
                  <label
                    key={key}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-sky-50 border-sky-500 shadow-sm'
                        : 'bg-white border-slate-300 hover:border-sky-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={key}
                      checked={isSelected}
                      onChange={() => onAnswerChange(question.id, key)}
                      className="h-4 w-4 text-sky-600 border-slate-300 focus:ring-sky-500"
                    />
                    <span className={`ml-3 text-base ${isSelected ? 'font-semibold text-sky-800' : 'text-slate-700'}`}>
                      {value}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
        <div className="pt-6 flex justify-end">
          <button
            onClick={onSubmit}
            disabled={!allAnswered}
            className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Ver Resultado
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
