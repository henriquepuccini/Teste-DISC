import React, { useState, useMemo } from 'react';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Home from './components/Home';
import { questions } from './constants/questions';
import { ProfileType, type ResultsData } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<'home' | 'quiz' | 'results'>('home');
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswerChange = (questionId: number, optionKey: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: optionKey,
    }));
  };

  const calculateResults = (): ResultsData => {
    const initialCounts = { a: 0, b: 0, c: 0, d: 0 };
    const counts = Object.values(answers).reduce((acc, option) => {
      if (option in acc) {
        acc[option as keyof typeof acc]++;
      }
      return acc;
    }, initialCounts);

    const totalQuestions = questions.length;
    if (totalQuestions === 0) {
        return {
          [ProfileType.Dominancia]: 0,
          [ProfileType.Influencia]: 0,
          [ProfileType.Estabilidade]: 0,
          [ProfileType.Conformidade]: 0,
        };
    }

    return {
      [ProfileType.Dominancia]: Math.round((counts.a / totalQuestions) * 100),
      [ProfileType.Influencia]: Math.round((counts.b / totalQuestions) * 100),
      [ProfileType.Estabilidade]: Math.round((counts.c / totalQuestions) * 100),
      [ProfileType.Conformidade]: Math.round((counts.d / totalQuestions) * 100),
    };
  };

  const results = useMemo(() => {
    if (appState !== 'results') return null;
    return calculateResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState, answers]);

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setAppState('results');
    } else {
      alert('Por favor, responda todas as questões.');
    }
  };

  const handleReset = () => {
    setAnswers({});
    setAppState('home');
  };

  const handleStart = () => {
    setAppState('quiz');
  };

  const renderContent = () => {
    switch (appState) {
      case 'quiz':
        return (
          <Quiz
            questions={questions}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onSubmit={handleSubmit}
          />
        );
      case 'results':
        return results && <Results results={results} onReset={handleReset} />;
      case 'home':
      default:
        return <Home onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Teste de Perfil Comportamental</h1>
        </header>
        <main className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {renderContent()}
        </main>
        <footer className="text-center mt-8 text-sm text-slate-500">
          <p>Adaptado do teste de Jeferson Souza (@borajeferson)</p>
        </footer>
      </div>
    </div>
  );
};

export default App;