import React from 'react';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="text-center py-8">
      <div className="mb-8">
        <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
          <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bem-vindo ao Teste DISC</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Descubra seu perfil comportamental e entenda como você se comunica, toma decisões e se relaciona no ambiente de vendas.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
        <h3 className="font-semibold text-gray-800 mb-4">O que você vai descobrir:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="flex items-start">
            <span className="text-red-500 font-bold mr-2">D</span>
            <div>
              <p className="font-semibold text-gray-800">Dominância</p>
              <p className="text-sm text-gray-600">Foco em resultados e ação</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-yellow-500 font-bold mr-2">I</span>
            <div>
              <p className="font-semibold text-gray-800">Influência</p>
              <p className="text-sm text-gray-600">Foco em pessoas e relacionamentos</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 font-bold mr-2">S</span>
            <div>
              <p className="font-semibold text-gray-800">Estabilidade</p>
              <p className="text-sm text-gray-600">Foco em harmonia e consistência</p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 font-bold mr-2">C</span>
            <div>
              <p className="font-semibold text-gray-800">Conformidade</p>
              <p className="text-sm text-gray-600">Foco em qualidade e precisão</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-4">⏱️ Tempo estimado: 5 minutos | 📝 20 questões</p>
        <button
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Iniciar Teste
        </button>
      </div>

      <p className="text-xs text-gray-400">
        Este teste é baseado na metodologia DISC amplamente utilizada em vendas e desenvolvimento profissional
      </p>
    </div>
  );
};

export default Home;
