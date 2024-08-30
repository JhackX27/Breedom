import React, { useState } from 'react';

const cardData = {
  "red": [
    { "id": 1, "content": "Tu mejor amigo comienza a salir con tu ex pareja sin decírtelo. ¿Cómo manejas la situación?" },
    { "id": 2, "content": "Descubres que tu compañero de piso ha estado usando tus cosas sin permiso. ¿Qué haces?" },
    { "id": 3, "content": "Tu jefe te asigna un proyecto importante pero no te da los recursos necesarios. ¿Cómo lo abordas?" },
    { "id": 4, "content": "Un amigo constantemente cancela planes a último momento. ¿Cómo resuelves este conflicto?" },
    { "id": 5, "content": "Tus padres no aprueban tu elección de carrera. ¿Cómo manejas esta situación?" },
    { "id": 6, "content": "Tu pareja pasa demasiado tiempo en redes sociales y te sientes ignorado. ¿Qué haces?" },
    { "id": 7, "content": "Un compañero de clase plagia tu trabajo y obtiene una mejor calificación. ¿Cómo procedes?" },
    { "id": 8, "content": "Tu hermano/a menor siempre toma tus cosas sin pedir permiso. ¿Cómo abordas el problema?" },
    { "id": 9, "content": "Te enteras de que un amigo ha estado hablando mal de ti a tus espaldas. ¿Qué haces?" },
    { "id": 10, "content": "Tu grupo de amigos planea un viaje pero no puedes permitírtelo económicamente. ¿Cómo lo manejas?" },
    { "id": 11, "content": "Tu compañero de trabajo constantemente llega tarde, afectando tu productividad. ¿Cómo lo resuelves?" },
    { "id": 12, "content": "Tus vecinos organizan fiestas ruidosas cada fin de semana. ¿Cómo abordas la situación?" },
    { "id": 13, "content": "Tu pareja quiere mudarse juntos pero tú no te sientes listo/a. ¿Cómo manejas el conflicto?" },
    { "id": 14, "content": "Un profesor te acusa injustamente de hacer trampa en un examen. ¿Qué haces?" },
    { "id": 15, "content": "Tu mejor amigo/a comienza a salir con alguien que no te agrada. ¿Cómo manejas la situación?" },
    { "id": 16, "content": "Tus padres insisten en que dejes tu trabajo de medio tiempo para enfocarte en los estudios. ¿Cómo lo resuelves?" },
    { "id": 17, "content": "Un compañero de equipo no está cumpliendo con su parte del trabajo en un proyecto grupal. ¿Qué haces?" },
    { "id": 18, "content": "Tu pareja tiene celos de tu amistad con alguien del sexo opuesto. ¿Cómo manejas el conflicto?" },
    { "id": 19, "content": "Descubres que tu mejor amigo/a ha estado mintiendo sobre algo importante. ¿Cómo lo abordas?" },
    { "id": 20, "content": "Tu jefe te pide que trabajes horas extra sin paga adicional. ¿Cómo manejas esta situación?" }
  ],
  "blue": [
    { "id": 21, "content": "¿Cómo puede la técnica de 'yo-mensaje' mejorar la comunicación en un conflicto?" },
    { "id": 22, "content": "¿Cuál es la diferencia entre un compromiso y una solución win-win en la resolución de conflictos?" },
    { "id": 23, "content": "¿Cómo puedes identificar y manejar tus propios sesgos al abordar un conflicto?" },
    { "id": 24, "content": "¿Qué papel juega la paciencia en la resolución efectiva de conflictos?" },
    { "id": 25, "content": "¿Cómo puedes utilizar el humor de manera apropiada para aliviar la tensión en un conflicto?" },
    { "id": 26, "content": "¿Cuáles son algunas señales de que un conflicto está escalando y cómo puedes prevenirlo?" },
    { "id": 27, "content": "¿Cómo puedes practicar la auto-reflexión para mejorar tus habilidades de resolución de conflictos?" },
    { "id": 28, "content": "¿Qué estrategias puedes utilizar para mantener la calma durante una discusión acalorada?" },
    { "id": 29, "content": "¿Cómo puedes establecer límites saludables sin crear conflictos innecesarios?" },
    { "id": 30, "content": "¿Cuál es la importancia de la validación emocional en la resolución de conflictos?" },
    { "id": 31, "content": "¿Cómo puede la técnica de 'reencuadre' ayudar a ver un conflicto desde una nueva perspectiva?" },
    { "id": 32, "content": "¿Qué papel juega la cultura en la forma en que las personas abordan los conflictos?" },
    { "id": 33, "content": "¿Cómo puedes utilizar la 'escucha reflexiva' para mejorar la comunicación en un conflicto?" },
    { "id": 34, "content": "¿Cuáles son algunas estrategias para manejar conflictos en el entorno digital o en redes sociales?" },
    { "id": 35, "content": "¿Cómo puedes diferenciar entre un conflicto saludable y uno tóxico en una relación?" },
    { "id": 36, "content": "¿Qué papel juega la asertividad en la resolución efectiva de conflictos?" },
    { "id": 37, "content": "¿Cómo puedes utilizar la técnica de 'separar a la persona del problema' en un conflicto?" },
    { "id": 38, "content": "¿Cuál es la importancia de reconocer y disculparse por tus propios errores en un conflicto?" },
    { "id": 39, "content": "¿Cómo puedes manejar un conflicto con alguien que se niega a comunicarse o cooperar?" },
    { "id": 40, "content": "¿Qué estrategias puedes utilizar para prevenir conflictos futuros después de resolver uno?" }
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
      <div className="bg-green-700 border-4 border-yellow-600 rounded-lg p-4 sm:p-8 w-full max-w-4xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-yellow-300 text-center">Juego de Resolución de Conflictos</h2>
        
        {gameState === 'start' ? (
          <div className="text-center">
            <p className="text-white mb-4">¡Bienvenido al juego de resolución de conflictos! Elige una baraja para comenzar.</p>
            <button 
              onClick={startGame} 
              className="px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-black font-bold rounded-lg shadow hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
            >
              JUGAR
            </button>
          </div>
        ) : (
          <>
            {!selectedCard ? (
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="text-center">
                  <div 
                    className="w-full sm:w-40 h-40 sm:h-60 bg-red-600 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition duration-300 flex items-center justify-center text-white font-bold"
                    onClick={() => selectCard('red')}
                  >
                    ESCENARIOS
                  </div>
                </div>
                <div className="text-center">
                  <div 
                    className="w-full sm:w-40 h-40 sm:h-60 bg-blue-600 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition duration-300 flex items-center justify-center text-white font-bold"
                    onClick={() => selectCard('blue')}
                  >
                    PREGUNTAS
                  </div>
                </div>
              </div>
            ) : (
              <div className={`max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden ${deck === 'red' ? 'border-red-500' : 'border-blue-500'} border-4`}>
                <div className="p-4 sm:p-8">
                  <div className="uppercase tracking-wide text-sm font-semibold mb-2 text-center">
                    {deck === 'red' ? 'Escenario' : 'Pregunta'}
                  </div>
                  <p className="text-gray-700 text-base sm:text-lg mb-4">{selectedCard.content}</p>
                  <div className="text-center">
                    <button
                      onClick={resetGame}
                      className="px-4 sm:px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
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