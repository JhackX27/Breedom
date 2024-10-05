import React, { useState, useEffect } from 'react';
import './CardGame.css'; // Mover los estilos al archivo CSS

const gameData = {
  "preguntas": [
    {
      "tipo": "pregunta",
      "texto": "¿Qué suele preocuparte en los momentos en que puedes estar solo/a? ¿Por qué y qué podrías esperar que pase si no haces algo al respecto?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Alguna vez has pensado que lo que haces no tiene sentido? ¿Qué te mantiene haciendo lo que haces diariamente?"
    },
    {
      "tipo": "pregunta",
      "texto": "Si la vida fuera siempre como quisieras, ¿qué tendrías ahora mismo?"
    },
    {
      "tipo": "pregunta",
      "texto": "Si la vida siempre estuviera en tu contra, ¿qué crees que habría pasado contigo? ¿Qué harías para remediarlo?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Qué has hecho últimamente para evitar realizar algo importante para ti? (Si la persona no entiende la referencia, puede ser: necesitas terminar tu tesis, pero constantemente evitas matricularte en muchos cursos a la vez)."
    },
    {
      "tipo": "pregunta",
      "texto": "¿Qué esperas lograr al final del año? ¿Por qué es importante para ti hacerlo? (Intenta continuar con la segunda consigna, preguntando por qué sigue siendo importante)."
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cómo consideras que alguien podría establecer una comunicación sincera contigo? ¿Qué preguntas y acciones son necesarias y que tú también harías?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cómo se puede descubrir cuando alguien está fingiendo acercarse a otra persona? ¿Qué acciones se deben tomar en esa situación? ¿Las realizas? ¿Realmente eres capaz de cumplir con tu seguridad? (Momento reflexivo)."
    },
    {
      "tipo": "pregunta",
      "texto": "Profundizando en la comunicación: ¿Cuál es la forma más efectiva que has encontrado para resolver un desacuerdo con alguien? ¿Qué papel juega la escucha activa en tus relaciones?"
    },
    {
      "tipo": "pregunta",
      "texto": "Confianza y vulnerabilidad: ¿Te resulta fácil confiar en los demás? ¿Qué te hace sentir más seguro/a para compartir tus sentimientos y vulnerabilidades?"
    },
    {
      "tipo": "pregunta",
      "texto": "Asertividad: ¿Cómo expresas tus necesidades y límites de manera clara y respetuosa? ¿En qué situaciones te cuesta más ser asertivo/a?"
    },
    {
      "tipo": "pregunta",
      "texto": "Empatía: ¿Cómo sueles entender y responder a las emociones de los demás? ¿Crees que la empatía es esencial para construir relaciones sólidas?"
    },
    {
      "tipo": "pregunta",
      "texto": "Perspectivas diferentes: ¿Cómo crees que alguien de una cultura o generación diferente podría percibir la misma situación? ¿Qué podrías aprender de esa perspectiva?"
    },
    {
      "tipo": "pregunta",
      "texto": "Manejo de emociones fuertes: ¿Cuál es la emoción más difícil de manejar para ti en una situación de conflicto? ¿Qué estrategias utilizas para regular tus emociones?"
    },
    {
      "tipo": "pregunta",
      "texto": "Resolución creativa de conflictos: ¿Se te ocurren soluciones creativas o inesperadas para resolver un conflicto? ¿Cómo fomentarías la creatividad en un grupo de personas que están en desacuerdo?"
    },
    {
      "tipo": "pregunta",
      "texto": "Perdonar y olvidar: ¿Qué significa para ti perdonar a alguien? ¿Crees que es posible olvidar completamente una herida emocional?"
    },
    {
      "tipo": "pregunta",
      "texto": "Aprender de los errores: ¿Cuál ha sido el error más grande que has cometido y qué has aprendido de él? ¿Cómo aplicas esas lecciones en tu vida diaria?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Qué cosas te hacen sentir agradecido/a en la vida? ¿Cómo practicas la gratitud en tu día a día?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cuál es tu propósito en la vida? ¿Qué te motiva a levantarte cada mañana?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cuáles son los cinco valores más importantes para ti en este momento de tu vida? ¿Cómo influyen estos valores en tus decisiones y acciones diarias?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Alguna vez te has encontrado en una situación en la que tus valores o principios han entrado en conflicto? ¿Cómo resuelves estos dilemas?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cómo crees que han evolucionado tus valores a lo largo de tu vida? ¿Qué experiencias han contribuido a este cambio?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cómo puedes integrar tus valores en tu vida diaria de manera más consciente? ¿Qué acciones concretas puedes tomar para vivir de acuerdo con tus creencias?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cómo influyen tus valores en tus relaciones con los demás? ¿Buscas personas que compartan tus mismos valores?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Qué pensamientos y emociones surgen en ti cuando te enfrentas a un conflicto, ya sea con tu familia, tu pareja o tus amistades? ¿Consideras que realmente puedes observarlos sin juzgarlos?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cómo reacciona tu cuerpo cuando estás en medio de una discusión? Qué sensaciones puedes empezar a notar que aparecen; consideras que eso te beneficia o crees que algo debe cambiar?"
    },
    {
      "tipo": "pregunta",
      "texto": "Cuando estás en medio de una discusión, qué parte de ti quiere evitar o controlar los primeros pensamientos que te vienen a la mente; qué emociones aparecen."
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cuáles son tus valores o principios más profundos presentes durante una discusión? Realmente, puedes aplicarlos cuando has tenido discusiones; qué tan bien te ha ido hasta ahora."
    },
    {
      "tipo": "pregunta",
      "texto": "¿Qué acciones concretas (al menos cuatro) realizas para estar alineado/a con tus valores y/o principios que rigen tus decisiones en la vida; consideras que las realizas, con qué frecuencia?"
    },
    {
      "tipo": "pregunta",
      "texto": "Cuando estás en medio de una discusión con tu familia, pareja o amistad, puedes mantenerte enfocado/a en lo que es importante para ti en la vida, o la tensión del conflicto ha ganado la mayoría del tiempo?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Qué historias te cuentas sobre ti mismo/a, sobre la otra persona o sobre la situación? ¿Cómo estas historias influyen en tus reacciones?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cómo afecta tu lenguaje interno (pensamientos, auto-conversaciones) tu capacidad para resolver el conflicto de manera constructiva?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Puedes identificar patrones de pensamiento que te llevan a estancarte en el conflicto?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Estás dispuesto/a a considerar diferentes perspectivas sobre el conflicto, incluso aquellas que te hacen sentir incómodo/a?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Puedes experimentar la situación desde el punto de vista de la otra persona? Cuándo fue la última vez que no pudiste hacerlo?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cómo puedes desafiar tus creencias fijas sobre ti mismo/a, sobre la otra persona o sobre la situación?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Qué pequeñas acciones puedes tomar hoy para avanzar hacia una resolución del conflicto?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cómo puedes mantenerte comprometido/a con tus valores y acciones a pesar de los obstáculos?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Qué apoyo puedes buscar de tu entorno para llevar a cabo las acciones que te mantendrán fiel a tus valores y/o creencias en tu vida cotidiana; consideras que alguna vez has quebrantado alguna de esas creencias?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Cómo te hablas a ti mismo/a durante y después de un conflicto; puedes ser más amable y compasivo/a contigo mismo/a?"
    },
    {
      "tipo": "pregunta",
      "texto": "¿Qué has aprendido de experiencias pasadas de conflicto; cómo puedes aplicar estos aprendizajes a la situación actual?"
    }
  ],
  "roleplaying": [
    {
      "tipo": "roleplaying",
      "texto": "Frente a ti estás tú mismo/a. ¿Cómo le hablarías a tu yo del futuro? Plantea al menos cuatro interrogantes."
    },
    {
      "tipo": "roleplaying",
      "texto": "Frente a ti está un estudiante de la nueva generación. Eres un profesor que debe enseñarle lo que podrías haber hecho en su lugar."
    },
    {
      "tipo": "roleplaying",
      "texto": "Me corresponde ser una persona que está frente a un escenario con muchos espectadores porque he publicado mi biografía mundialmente aclamada. Me piden que dé unas palabras célebres al recibir mi premio."
    },
    {
      "tipo": "roleplaying",
      "texto": "Frente a ti hay una persona a quien han engañado y ha sufrido lo mismo que tú sufriste en algún momento de tu vida. Indícale qué puede hacer ahora que aún tiene tiempo para remediarlo y no caer en el mismo error."
    },
    {
      "tipo": "roleplaying",
      "texto": "Imagina que has tenido una discusión con un amigo cercano o familiar, y ahora ambos se sienten heridos. Expresa tus sentimientos y escucha activamente los suyos, sin juzgar ni culpar (para esta dinámica debes explicar previamente lo sucedido e identificar a quién le vas a hablar)."
    }
 ]
        };

const CardGame = () => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [cards, setCards] = useState([...gameData.preguntas, ...gameData.roleplaying]);
  const [gameState, setGameState] = useState('setup');
  const [currentRound, setCurrentRound] = useState(1);
  const [timer, setTimer] = useState(600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTargetPlayer, setCurrentTargetPlayer] = useState(null);
  const [playersAnsweredThisRound, setPlayersAnsweredThisRound] = useState([]);
  const [roundHistory, setRoundHistory] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      alert('¡Se acabó el tiempo!');
      nextTurn();
    }
  }, [isTimerRunning, timer]);

  const handleSetPlayers = (numPlayers) => {
    const playerNames = Array.from({ length: numPlayers }, (_, index) => ({
      name: `Jugador ${index + 1}`,
      starsReceived: 0,
      starsToGive: 8,
    }));
    setPlayers(playerNames);
  };

  const handleStartGame = () => {
    if (players.some((player) => player.name.trim() === "")) {
      alert("Por favor, ingresa todos los nombres de los jugadores.");
      return;
    }
    setGameState('playing');
  };

  const handleCardSelect = (cardIndex) => {
    setSelectedCard(cards[cardIndex]);
    setCards(cards.filter((_, index) => index !== cardIndex));
  };

  const handleTargetSelect = (targetPlayerIndex) => {
    setCurrentTargetPlayer(targetPlayerIndex);
  };

  const handleAnswer = (answered) => {
    setIsTimerRunning(false);
    if (answered) {
      setGameState('rating');
    } else {
      nextTurn();
    }
  };

  const ratePlayer = (ratingPlayerIndex, stars) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, index) => {
        if (index === currentPlayerIndex) {
          return { ...player, starsReceived: player.starsReceived + stars };
        }
        if (index === ratingPlayerIndex) {
          return { ...player, starsToGive: player.starsToGive - stars };
        }
        return player;
      })
    );
  };

  const nextTurn = () => {
    if (cards.length === 0) {
      endGame();
      return;
    }
    setSelectedCard(null);
    setCurrentTargetPlayer(null);
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    setPlayersAnsweredThisRound([]);
    setTimer(600);
    setGameState('playing');
  };

  const endGame = () => {
    setGameState('gameOver');
    const winningPlayer = players.reduce((max, player) =>
      player.starsReceived > max.starsReceived ? player : max,
      players[0]
    );
    setWinner(winningPlayer);
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
          defaultValue="2"
          onChange={(e) => handleSetPlayers(parseInt(e.target.value))}
          className="border rounded px-2 py-1"
        />
      </div>
      <button onClick={handleStartGame} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Comenzar Juego
      </button>
    </div>
  );

  const renderPlaying = () => (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Turno de {players[currentPlayerIndex].name}</h2>
      {selectedCard && (
        <div className="mt-4">
          <p>Selecciona a quién hacer la pregunta:</p>
          <div className="flex space-x-2 mt-2">
            {players.map((player, index) => (
              index !== currentPlayerIndex && (
                <button
                  key={index}
                  onClick={() => handleTargetSelect(index)}
                  className={`px-2 py-1 border rounded ${currentTargetPlayer === index ? 'bg-green-200' : 'bg-white'}`}
                >
                  {player.name}
                </button>
              )
            ))}
          </div>
        </div>
      )}
      {currentTargetPlayer !== null && (
        <div className="mt-4">
          <p>Tiempo restante: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
          <div className="flex space-x-2 mt-2">
            <button onClick={() => handleAnswer(true)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Contestó
            </button>
            <button onClick={() => handleAnswer(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              No Contestó
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderGameOver = () => (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Juego Terminado</h2>
      <p>¡El ganador es {winner.name} con {winner.starsReceived} estrellas!</p>
      <button onClick={() => setGameState('setup')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
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
        {gameState === 'gameOver' && renderGameOver()}
      </div>
    </div>
  );
};

export default CardGame;
