import React, { useState } from 'react';
import CardGame from './CardGame';

const GameCard = ({ title, description, onPlay }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button 
        onClick={onPlay}
        className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
      >
        Jugar Ahora
      </button>
    </div>
  </div>
);

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [achievements, setAchievements] = useState(0);

  const handlePlayGame = (gameName) => {
    setSelectedGame(gameName);
  };

  const updateAchievements = (newAchievements) => {
    setAchievements(newAchievements);
  };

  if (selectedGame === 'CardGame') {
    return <CardGame onBack={() => setSelectedGame(null)} updateAchievements={updateAchievements} />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Juegos Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GameCard 
          title="Resolución de Conflictos" 
          description="Aprende a manejar situaciones difíciles"
          onPlay={() => handlePlayGame('CardGame')}
        />
        {/* Otros juegos aquí */}
      </div>
      <div className="mt-6 p-4 bg-blue-100 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-800 mb-2">Logros</h3>
        <p className="text-blue-700">Has completado {achievements} categorías de preguntas.</p>
      </div>
    </div>
  );
};

export default Games;