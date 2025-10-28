import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { type ResultsData, ProfileType } from '../types';

interface ResultsProps {
  results: ResultsData;
  onReset: () => void;
}

const ProfileColors: { [key in ProfileType]: string } = {
  [ProfileType.Dominancia]: '#ef4444', // red-500
  [ProfileType.Influencia]: '#f59e0b', // amber-500
  [ProfileType.Estabilidade]: '#10b981', // emerald-500
  [ProfileType.Conformidade]: '#3b82f6', // blue-500
};

// Cores de texto mais escuras para melhor acessibilidade (WCAG AA)
const ProfileTextColors: { [key in ProfileType]: string } = {
  [ProfileType.Dominancia]: '#b91c1c', // red-700
  [ProfileType.Influencia]: '#b45309', // amber-700
  [ProfileType.Estabilidade]: '#047857', // emerald-700
  [ProfileType.Conformidade]: '#1d4ed8', // blue-700
};

const profileDescriptions: { [key in ProfileType]: { description: string; keywords: string[] } } = {
  [ProfileType.Dominancia]: {
    description: 'Pessoas com perfil dominante são diretas, focadas em resultados, firmes e competitivas. Gostam de desafios e de tomar a frente das situações.',
    keywords: ['Direto', 'Decidido', 'Competitivo', 'Audacioso'],
  },
  [ProfileType.Influencia]: {
    description: 'Indivíduos influentes são comunicativos, otimistas, entusiasmados e sociáveis. Gostam de interagir, persuadir e trabalhar em equipe.',
    keywords: ['Comunicativo', 'Otimista', 'Sociável', 'Entusiasmado'],
  },
  [ProfileType.Estabilidade]: {
    description: 'O perfil de estabilidade caracteriza pessoas pacientes, calmas, leais e consistentes. Valorizam a segurança, a harmonia e o trabalho em ritmo constante.',
    keywords: ['Paciente', 'Calmo', 'Leal', 'Consistente'],
  },
  [ProfileType.Conformidade]: {
    description: 'Pessoas com alta conformidade são precisas, analíticas, cuidadosas e organizadas. Gostam de seguir regras, garantir a qualidade e trabalhar com dados.',
    keywords: ['Preciso', 'Analítico', 'Organizado', 'Criterioso'],
  },
};

const WhatsAppIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.225 4.485 4.535-1.182zM8.381 9.989c-.04-.076-.271-.125-.401-.125-.111 0-.246.012-.371.012-.225.012-.475.062-.693.187-.306.175-.636.425-.893.725-.306.35-.606.75-.825 1.175-.225.45-.313.95-.313 1.463s.25 1.575.825 2.3c.575.725 1.463 1.525 2.638 2.625 1.55 1.425 2.938 2.05 3.863 2.513.925.462 1.637.7 2.225.887.8.275 1.425.212 1.875-.05.525-.3 1.463-1.4 1.875-2.738.413-1.337.413-2.475.288-2.737-.125-.275-.25-.413-.513-.638-.262-.225-.525-.35-.75-.412-.225-.063-.475-.038-.663.037-.212.075-.45.312-.575.487-.125.175-.213.387-.3.537-.087.15-.175.25-.3.25-.125 0-.25-.025-.375-.087-.488-.237-1.113-.45-1.788-.975-.812-.612-1.35-1.387-1.475-1.637-.125-.25-.05-.387.025-.512.075-.125.175-.25.275-.375.1-.125.15-.237.212-.337.063-.1.038-.2.013-.262-.025-.063-.388-.938-.538-1.3z"/>
  </svg>
);


const Results: React.FC<ResultsProps> = ({ results, onReset }) => {
  const chartData = Object.entries(results).map(([name, value]) => ({
    name: name as ProfileType,
    value,
    fill: ProfileColors[name as ProfileType]
  }));

  const sortedProfiles = React.useMemo(() => 
    [...chartData].sort((a, b) => b.value - a.value)
  , [chartData]);
  
  const handleShare = () => {
    const dominantProfile = sortedProfiles[0]?.name || 'indefinido';
    const shareUrl = window.location.href;
    const message = encodeURIComponent(`Fiz o teste de perfil comportamental e meu perfil dominante é ${dominantProfile}! 人格 Descubra o seu também: ${shareUrl}`);
    window.open(`https://wa.me/?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Seu Perfil Comportamental</h2>
      <p className="text-slate-600 mb-8">Este é o resultado baseado em suas respostas.</p>
      
      <div className="w-full h-80 mb-12">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis type="number" domain={[0, 100]} tick={{fontSize: 12, fill: '#64748b'}} tickFormatter={(tick) => `${tick}%`} />
            <YAxis type="category" dataKey="name" width={110} tick={{fontSize: 14, fill: '#334155'}} interval={0} />
            <Tooltip 
                cursor={{fill: '#f1f5f9'}} 
                contentStyle={{
                    borderRadius: '0.5rem',
                    borderColor: '#cbd5e1',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: number) => [`${value}%`, "Pontuação"]} 
            />
            <Bar dataKey="value" name="Pontuação" barSize={35}>
               {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8 text-left">
        {sortedProfiles.map((profile, index) => {
            const isDominant = index === 0;
            return (
                <div key={profile.name} className={`p-5 rounded-xl transition-all duration-300 ${isDominant ? 'shadow-2xl scale-105' : 'shadow-lg'}`} style={{borderTop: `4px solid ${profile.fill}`, backgroundColor: 'white'}}>
                    <div className="flex justify-between items-baseline">
                        <p className="font-bold text-lg" style={{color: ProfileTextColors[profile.name]}}>{profile.name}</p>
                        <p className="font-semibold text-2xl" style={{color: profile.fill}}>{profile.value}%</p>
                    </div>
                    <p className="text-sm text-slate-600 mt-3 mb-4">
                        {profileDescriptions[profile.name].description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {profileDescriptions[profile.name].keywords.map(keyword => (
                            <span key={keyword} className="text-xs font-medium px-2.5 py-0.5 rounded-full" style={{backgroundColor: `${profile.fill}20`, color: ProfileTextColors[profile.name]}}>
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>
            )
        })}
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
         <button
            onClick={handleShare}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold rounded-lg shadow-md hover:bg-emerald-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <WhatsAppIcon />
            Compartilhar
          </button>
          <button
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Refazer Teste
          </button>
      </div>
    </div>
  );
};

export default Results;
