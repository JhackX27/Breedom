import React, { useState, useEffect } from 'react';

// JSON con las preguntas y las dinámicas de juego
const gameData = {
  preguntas: [
    {
      tipo: "pregunta",
      texto: "¿Qué suele preocuparte en los momentos en que puedes estar solo/a? ¿Por qué y qué podrías esperar que pase si no haces algo al respecto?"
    },
    {
      tipo: "pregunta",
      texto: "¿Alguna vez has pensado que lo que haces no tiene sentido? ¿Qué te mantiene haciendo lo que haces diariamente?"
    },
    {
      tipo: "pregunta",
      texto: "Si la vida fuera siempre como quisieras, ¿qué tendrías ahora mismo?"
    },
    {
      tipo: "pregunta",
      texto: "Si la vida siempre estuviera en tu contra, ¿qué crees que habría pasado contigo? ¿Qué harías para remediarlo?"
    },
    {
      tipo: "pregunta",
      texto: "¿Qué has hecho últimamente para evitar realizar algo importante para ti?"
    },
    {
      tipo: "pregunta",
      texto: "¿Qué esperas lograr al final del año? ¿Por qué es importante para ti hacerlo?"
    },
    {
      tipo: "pregunta",
      texto: "¿Cómo consideras que alguien podría establecer una comunicación sincera contigo?"
    },
    // Puedes seguir agregando todas las preguntas aquí ...
  ],
  roleplaying: [
    {
      tipo: "roleplaying",
      texto: "Frente a ti estás tú mismo/a. ¿Cómo le hablarías a tu yo del futuro? Plantea al menos cuatro interrogantes."
    },
    {
      tipo: "roleplaying",
      texto: "Frente a ti está un estudiante de la nueva generación. Eres un profesor que debe enseñarle lo que podrías haber hecho en su lugar."
    },
    {
      tipo: "roleplaying",
      texto: "Me corresponde ser una persona que está frente a un escenario con muchos espectadores porque he publicado mi biografía mundialmente aclamada."
    },
    // Más preguntas de roleplaying aquí ...
  ]
};

const LocalMultiplayerCardGame = () => {
  const [gameState, setGameState] = useState('setup');
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [targetPlayerIndex, setTargetPlayerIndex] = useState(null);
  const [timer, setTimer] = useState(600); // 10 minutos = 600 segundos
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Se combinan las preguntas y las dinámicas roleplaying
  const combinedQuestions = [...gameData.preguntas, ...gameData.roleplaying];

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerRunning]);

  const setupGame = () => {
    const shuffledQuestions = [...combinedQuestions].sort(() => 0.5 - Math.random());
    const newPlayers = Array.from({ length: numPlayers }, (_, index) => ({
      id: index,
      name: `Jugador ${index + 1}`,
      cards: shuffledQuestions.slice(index * 5, (index + 1) * 5),
      starsReceived: 0,
      availableStars: 5,
    }));
    setPlayers(newPlayers);
    setGameState('playing');
  };

  const selectCard = (cardIndex) => {
    setSelectedCard(cardIndex);
    setTargetPlayerIndex(null);
    setTimer(600); // Reiniciar el temporizador a 10 minutos
    setIsTimerRunning(true);
  };

  const selectTargetPlayer = (playerIndex) => {
    setTargetPlayerIndex(playerIndex);
  };

  const handleAnswer = (answered) => {
    setIsTimerRunning(false);
    if (answered) {
      setGameState('rating');
    } else {
      nextTurn();
    }
  };

  const ratePlayers = (ratingPlayerIndex, stars) => {
    setPlayers(prevPlayers =>
      prevPlayers.map((player, index) => {
        if (index === currentPlayerIndex && index !== ratingPlayerIndex) {
          return { ...player, starsReceived: player.starsReceived + stars };
        }
        if (index === ratingPlayerIndex) {
          return { ...player, availableStars: player.availableStars - stars };
        }
        return player;
      })
    );
  };

  const nextTurn = () => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[currentPlayerIndex].cards = updatedPlayers[currentPlayerIndex].cards.filter(
        (_, i) => i !== selectedCard
      );
      return updatedPlayers;
    });
    setSelectedCard(null);
    setTargetPlayerIndex(null);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % numPlayers);
    setGameState('playing');

    if (players.every(player => player.cards.length === 0)) {
      setGameState('gameOver');
    }
  };

  const renderSetup = () => (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Configurar Juego</h2>
      <div className="flex items-center space-x-2">
        <label htmlFor="numPlayers">Número de Jugadores:</label>
        <input
          id="numPlayers"
          type="number"
          min="2"
          max="8"
          value={numPlayers}
          onChange={(e) => setNumPlayers(Math.max(2, Math.min(8, parseInt(e.target.value))))}
          className="border rounded px-2 py-1"
        />
      </div>
      <button
        onClick={setupGame}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Comenzar Juego
      </button>
    </div>
  );

  const renderPlaying = () => (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Turno de {players[currentPlayerIndex].name}</h2>
      <div className="flex space-x-2">
        {players[currentPlayerIndex].cards.map((card, index) => (
          <div
            key={index}
            onClick={() => selectCard(index)}
            className={`w-20 h-32 border rounded flex items-center justify-center cursor-pointer ${
              selectedCard === index ? 'bg-blue-200' : 'bg-white'
            }`}
          >
            {selectedCard === index ? card.texto : '?'}
          </div>
        ))}
      </div>
      {selectedCard !== null && (
        <div className="mt-4">
          <p>Selecciona a quién hacer la pregunta:</p>
          <div className="flex space-x-2 mt-2">
            {players.map((player, index) =>
              index !== currentPlayerIndex && (
                <button
                  key={index}
                  onClick={() => selectTargetPlayer(index)}
                  className={`px-2 py-1 border rounded ${
                    targetPlayerIndex === index ? 'bg-green-200' : 'bg-white'
                  }`}
                >
                  {player.name}
                </button>
              )
            )}
          </div>
        </div>
      )}
      {targetPlayerIndex !== null && (
        <div className="mt-4">
          <p>Tiempo restante: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')} minutos</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => handleAnswer(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Contestó
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              No Contestó
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderRating = () => (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Calificar Respuesta</h2>
      <p>¿Quién quiere dar estrellas a {players[currentPlayerIndex].name}?</p>
      <div className="flex flex-wrap justify-center gap-4">
        {players.map((player, index) =>
          index !== currentPlayerIndex && (
            <div key={index} className="flex flex-col items-center">
              <p>{player.name} (Estrellas disponibles: {player.availableStars})</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => ratePlayers(index, stars)}
                    disabled={player.availableStars < stars}
                    className={`px-2 py-1 border rounded ${
                      player.availableStars >= stars ? 'bg-yellow-200 hover:bg-yellow-300' : 'bg-gray-200'
                    }`}
                  >
                    {stars} ★
                  </button>
                ))}
              </div>
            </div>
          )
        )}
      </div>
      <button
        onClick={nextTurn}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Siguiente Turno
      </button>
    </div>
  );

  const renderGameOver = () => (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Juego Terminado</h2>
      <p>Resultados Finales:</p>
      {players.sort((a, b) => b.starsReceived - a.starsReceived).map((player, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span>{index + 1}.</span>
          <span>{player.name}</span>
          <span>{player.starsReceived} ★</span>
        </div>
      ))}
      <button
        onClick={() => setGameState('setup')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Jugar de Nuevo
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Juego de Cartas de Preguntas</h1>
        {gameState === 'setup' && renderSetup()}
        {gameState === 'playing' && renderPlaying()}
        {gameState === 'rating' && renderRating()}
        {gameState === 'gameOver' && renderGameOver()}
      </div>
    </div>
  );
};

export default LocalMultiplayerCardGame;
