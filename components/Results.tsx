import React from 'react';
import { ResultsData, ProfileType } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultsProps {
  results: ResultsData;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, onReset }) => {
  const profileColors = {
    [ProfileType.Dominancia]: '#ef4444',
    [ProfileType.Influencia]: '#f59e0b',
    [ProfileType.Estabilidade]: '#10b981',
    [ProfileType.Conformidade]: '#3b82f6',
  };

  const profileDescriptions = {
    [ProfileType.Dominancia]: {
      title: 'Dominância',
      traits: 'Direto, Assertivo, Competitivo, Focado em resultados',
      sales: 'Excelente em fechamentos rápidos e negociações diretas. Gosta de desafios e metas agressivas.',
    },
    [ProfileType.Influencia]: {
      title: 'Influência',
      traits: 'Comunicativo, Entusiasmado, Persuasivo, Sociável',
      sales: 'Ótimo em criar relacionamentos e networking. Fecha vendas através de conexão emocional.',
    },
    [ProfileType.Estabilidade]: {
      title: 'Estabilidade',
      traits: 'Paciente, Leal, Consistente, Apoiador',
      sales: 'Excelente em construir confiança e relacionamentos de longo prazo. Cliente fiel é prioridade.',
    },
    [ProfileType.Conformidade]: {
      title: 'Conformidade',
      traits: 'Analítico, Preciso, Detalhista, Cauteloso',
      sales: 'Especialista em vendas técnicas e consultivas. Convence através de dados e informações.',
    },
  };

  const chartData = Object.entries(results).map(([profile, value]) => ({
    name: profile,
    value,
    color: profileColors[profile as ProfileType],
  }));

  const dominantProfile = Object.entries(results).reduce((a, b) => (a[1] > b[1] ? a : b))[0] as ProfileType;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Seus Resultados</h2>
        <p className="text-gray-600">Análise do seu perfil comportamental em vendas</p>
      </div>

      {/* Perfil Dominante */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-2" style={{ color: profileColors[dominantProfile] }}>
          Seu Perfil Dominante: {dominantProfile}
        </h3>
        <p className="text-gray-700 mb-2">
          <strong>Características:</strong> {profileDescriptions[dominantProfile].traits}
        </p>
        <p className="text-gray-700">
          <strong>Em Vendas:</strong> {profileDescriptions[dominantProfile].sales}
        </p>
      </div>

      {/* Gráfico */}
      <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribuição do seu Perfil</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detalhes por Perfil */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {Object.entries(results).map(([profile, value]) => {
          const profileKey = profile as ProfileType;
          return (
            <div key={profile} className="border-2 rounded-lg p-4" style={{ borderColor: profileColors[profileKey] }}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-800">{profile}</h4>
                <span className="text-2xl font-bold" style={{ color: profileColors[profileKey] }}>
                  {value}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${value}%`, backgroundColor: profileColors[profileKey] }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dicas para Desenvolvimento */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
        <h4 className="font-semibold text-yellow-800 mb-2">💡 Dicas para Desenvolvimento</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Identifique o perfil DISC dos seus clientes para adaptar sua abordagem</li>
          <li>• Desenvolva seus perfis mais baixos para se tornar mais versátil</li>
          <li>• Use seus pontos fortes naturais como vantagem competitiva</li>
          <li>• Trabalhe em equipe com pessoas de perfis complementares</li>
        </ul>
      </div>

      {/* Botão Reset */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Fazer Teste Novamente
        </button>
      </div>
    </div>
  );
};

export default Results;
