import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center text-center py-8 sm:py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">Descubra Seu Perfil Comportamental</h2>
      <p className="max-w-2xl text-slate-600 mb-8 leading-relaxed">
        Este teste rápido de 25 perguntas ajudará você a entender seus traços dominantes de personalidade, baseados em quatro perfis principais: Dominância, Influência, Estabilidade e Conformidade.
        <br/><br/>
        Não há respostas certas ou erradas. Apenas escolha a opção que mais se parece com você. Vamos começar?
      </p>
      <button
        onClick={onStart}
        className="px-10 py-4 bg-sky-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-sky-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
      >
        Iniciar Teste
      </button>
    </div>
  );
};

export default Home;
