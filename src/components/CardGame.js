import React, { useState } from 'react';

const cardData = {
  red: [
    { id: 1, content: "Tu amigo te pide prestado dinero pero no te lo devuelve. ¿Cómo manejas la situación?" },
    { id: 2, content: "Tu pareja constantemente llega tarde a sus citas. ¿Cómo abordas este problema?" },
    { id: 3, content: "Un compañero de trabajo toma crédito por tu idea. ¿Qué haces?" },
    { id: 4, content: "Tu vecino hace mucho ruido por las noches. ¿Cómo resuelves este conflicto?" },
    { id: 5, content: "Un familiar critica constantemente tus decisiones. ¿Cómo manejas esta situación?" }
  ],
  blue: [
    { id: 6, content: "¿Cuál es la importancia de la comunicación asertiva en la resolución de conflictos?" },
    { id: 7, content: "¿Cómo puede la empatía ayudar a resolver conflictos interpersonales?" },
    { id: 8, content: "¿Qué papel juega la escucha activa en la resolución de conflictos?" },
    { id: 9, content: "¿Cómo puedes manejar tus emociones durante un conflicto?" },
    { id: 10, content: "¿Cuáles son algunas estrategias efectivas para llegar a un compromiso en un conflicto?" }
  ]
};

const CardGame = ({ onBack }) => {
  const [gameState, setGameState] = useState('start');
  const [selectedCard, setSelectedCard] = useState(null);
  const [deck, setDeck] = useState('');

  const startGame = () => {
    setGameState('playing');
  };

  const selectCard = (deckColor) => {
    const randomIndex = Math.floor(Math.random() * cardData[deckColor].length);
    setSelectedCard(cardData[deckColor][randomIndex]);
    setDeck(deckColor);
  };

  const resetGame = () => {
    setSelectedCard(null);
    setDeck('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-800 to-green-600 p-4">
      <div className="bg-green-700 border-4 border-yellow-600 rounded-lg p-8 max-w-4xl w-full shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-yellow-300 text-center">Juego de Resolución de Conflictos</h2>
        
        {gameState === 'start' ? (
          <div className="text-center">
            <p className="text-white mb-4">¡Bienvenido al juego de resolución de conflictos! Elige una baraja para comenzar.</p>
            <button 
              onClick={startGame} 
              className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg shadow hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
            >
              JUGAR
            </button>
          </div>
        ) : (
          <>
            {!selectedCard ? (
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div 
                    className="w-40 h-60 bg-red-600 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition duration-300 flex items-center justify-center text-white font-bold"
                    onClick={() => selectCard('red')}
                  >
                    ESCENARIOS
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="w-40 h-60 bg-blue-600 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition duration-300 flex items-center justify-center text-white font-bold"
                    onClick={() => selectCard('blue')}
                  >
                    PREGUNTAS
                  </div>
                </div>
              </div>
            ) : (
              <div className={`max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden ${deck === 'red' ? 'border-red-500' : 'border-blue-500'} border-4`}>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm font-semibold mb-2 text-center">
                    {deck === 'red' ? 'Escenario' : 'Pregunta'}
                  </div>
                  <p className="text-gray-700 text-lg mb-4">{selectedCard.content}</p>
                  <div className="text-center">
                    <button
                      onClick={resetGame}
                      className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
                    >
                      Siguiente carta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <button 
        onClick={onBack} 
        className="mt-6 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition duration-300"
      >
        Volver a Juegos
      </button>
    </div>
  );
};

export default CardGame;