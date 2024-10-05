import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// CSS Styling with Styled-components
const GameContainer = styled.div`
  font-family: 'Arial', sans-serif;
  text-align: center;
  background-color: #f3f3f3;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 900px;
  margin: 50px auto;
`;

const Button = styled.button`
  font-size: 1.1rem;
  padding: 0.8rem 2rem;
  margin: 0.8rem;
  border: none;
  border-radius: 50px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const DisabledButton = styled(Button)`
  background-color: #e74c3c;
  color: #fff;

  &:hover {
    background-color: #c0392b;
  }

  &:disabled {
    background-color: #bdc3c7;
  }
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: 2px solid #3498db;
  border-radius: 50px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #2ecc71;
    box-shadow: 0 0 10px rgba(46, 204, 113, 0.3);
  }
`;

const CardContainer = styled.div`
  width: 350px;
  height: 250px;
  margin: 2rem auto;
  perspective: 1000px;
  cursor: pointer;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  box-sizing: border-box;
`;

const CardFront = styled(CardFace)`
  background-color: #3498db;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CardBack = styled(CardFace)`
  background-color: #ffffff;
  color: #34495e;
  transform: rotateY(180deg);
  font-size: 1rem;
  overflow-y: auto;
`;

const TimerDisplay = styled.div`
  font-size: 1.8rem;
  color: #e74c3c;
  font-weight: bold;
  margin: 1rem 0;
`;

const RoundDisplay = styled.div`
  font-size: 1.5rem;
  color: #2980b9;
  font-weight: bold;
  margin: 1rem 0;
`;

const Scoreboard = styled.div`
  margin-top: 2rem;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    color: #2c3e50;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background-color: #ffffff;
    margin: 0.8rem 0;
    padding: 0.8rem 1.2rem;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    font-weight: bold;
    color: #e67e22;
  }
`;

const HistoryContainer = styled.div`
  margin-top: 2rem;
  text-align: left;
  background: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
`;

const HistoryItem = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #ecf0f1;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const AnsweredCardsButton = styled(Button)`
  background-color: #27ae60;
  &:hover {
    background-color: #1e8449;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-height: 80%;
  overflow-y: auto;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background-color: #3498db;
    color: white;
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ApprovalSection = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  margin: 1rem 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ApprovalLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 0.5rem;
  font-size: 1rem;
  color: #34495e;

  input {
    margin-right: 0.5rem;
    transform: scale(1.5);
    cursor: pointer;
  }

  input:checked {
    accent-color: #27ae60; /* Color of the checkbox when checked */
  }

  input:disabled {
    accent-color: #e74c3c; /* Color of the checkbox when disabled */
  }
`;

const CardGame = () => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [cards, setCards] = useState([...gameData.preguntas, ...gameData.roleplaying]);
  const [flipped, setFlipped] = useState(false);
  const [currentTargetPlayer, setCurrentTargetPlayer] = useState(null);
  const [approvalMode, setApprovalMode] = useState(false);
  const [approvedBy, setApprovedBy] = useState([]);
  const [timer, setTimer] = useState(600); // 10 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [playersAnsweredThisRound, setPlayersAnsweredThisRound] = useState([]);
  const [playersAskedThisRound, setPlayersAskedThisRound] = useState([]);
  const [roundNumber, setRoundNumber] = useState(1);
  const [gameHistory, setGameHistory] = useState([]);
  const [answeredCards, setAnsweredCards] = useState([]);
  const [showAnsweredCards, setShowAnsweredCards] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  // Control del temporizador
  useEffect(() => {
    let timerInterval;
    if (isTimerActive) {
      timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(timerInterval);
          nextTurn(); // Pasar al siguiente turno si se acaba el tiempo
          return 0;
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isTimerActive]);

  // Configurar los jugadores después de ingresar la información
  const handleSetPlayers = () => {
    if (playerNames.some((name) => name.trim() === "")) {
      alert("Por favor ingresa todos los nombres de los jugadores.");
      return;
    }

    const newPlayers = playerNames.map((name) => ({
      name: name.trim(),
      starsReceived: 0,
      starsToGive: 8,
    }));
    setPlayers(newPlayers);
  };

  // Manejar cambios en el nombre de los jugadores
  const handleNameChange = (index, value) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = value;
    setPlayerNames(newPlayerNames);
  };

  // Voltear la carta para revelar la pregunta
  const handleCardFlip = () => {
    if (cards.length === 0) {
      alert("No hay más preguntas disponibles.");
      return;
    }
    setFlipped(true);
  };

  // Seleccionar el destinatario para la pregunta
  const handleSelectTargetPlayer = (playerName) => {
    if (!flipped) {
      alert("Debes revelar la carta antes de seleccionar un destinatario.");
      return;
    }
    if (playersAnsweredThisRound.includes(playerName) || playerName === players[currentPlayerIndex].name) {
      alert("Este jugador ya fue seleccionado en esta ronda o eres tú mismo. Elige otro.");
      return;
    }
    setCurrentTargetPlayer(playerName);
    setShowConfirmButton(true);
  };

  // Confirmar al destinatario seleccionado e iniciar el temporizador
  const handleConfirmTargetPlayer = () => {
    setIsTimerActive(true);
    setShowConfirmButton(false);
    setPlayersAnsweredThisRound((prev) => [...prev, currentTargetPlayer]);
    setPlayersAskedThisRound((prev) => [...prev, players[currentPlayerIndex].name]);
  };

  // Manejar la respuesta del jugador
  const handleResponse = (answered) => {
    if (answered) {
      setApprovalMode(true);
      setIsTimerActive(false); // Detener el temporizador cuando el jugador responde
    } else {
      finalizeTurn();
    }
  };

  // Manejar la aprobación de otros jugadores
  const handleApprovalChange = (playerName, isApproved) => {
    if (isApproved) {
      if (!approvedBy.includes(playerName)) {
        setApprovedBy([...approvedBy, playerName]);
      }
    } else {
      setApprovedBy(approvedBy.filter((name) => name !== playerName));
    }
  };

  // Finalizar el turno actual
  const finalizeTurn = () => {
    const targetPlayerIndex = players.findIndex((player) => player.name === currentTargetPlayer);
    const updatedPlayers = [...players];

    approvedBy.forEach((approvingPlayerName) => {
      const approvingPlayerIndex = players.findIndex(
        (player) => player.name === approvingPlayerName
      );

      // Restar estrellas disponibles para dar del aprobador
      if (updatedPlayers[approvingPlayerIndex].starsToGive > 0) {
        updatedPlayers[approvingPlayerIndex].starsToGive -= 1;
        updatedPlayers[targetPlayerIndex].starsReceived += 1; // Sumar estrellas al destinatario
      }
    });

    setPlayers(updatedPlayers);

    const timeSpent = 600 - timer;
    setGameHistory((prevHistory) => [
      ...prevHistory,
      {
        turn: currentPlayerIndex + 1,
        askingPlayer: players[currentPlayerIndex].name,
        targetPlayer: currentTargetPlayer,
        timeSpent: timeSpent,
        approvedBy: approvedBy,
        round: roundNumber,
      },
    ]);

    setAnsweredCards((prev) => [
      ...prev,
      { question: cards[0].texto, targetPlayer: currentTargetPlayer, approvedBy: approvedBy, round: roundNumber },
    ]);

    // Verificar si algún jugador ha ganado el juego
    checkWinner(updatedPlayers);

    setApprovedBy([]); // Reset approvedBy for the next turn
    nextTurn();
  };

  // Avanzar al siguiente turno
  const nextTurn = () => {
    // Si todos los jugadores han preguntado y respondido, iniciar una nueva ronda
    if (playersAskedThisRound.length === players.length) {
      setPlayersAnsweredThisRound([]);
      setPlayersAskedThisRound([]);
      setRoundNumber(roundNumber + 1);
  
      // Elegir un nuevo jugador aleatoriamente para iniciar la nueva ronda
      const newFirstPlayerIndex = Math.floor(Math.random() * players.length);
      setCurrentPlayerIndex(newFirstPlayerIndex);
      setIsTimerActive(false);
      setTimer(600);
      setFlipped(false);
      setCurrentTargetPlayer(null);
      setApprovalMode(false);
      setCards((prevCards) => prevCards.slice(1));
      return;
    }
  
    let nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  
    // Asegurarse de que el siguiente jugador no sea uno que ya haya preguntado en esta ronda
    while (playersAskedThisRound.includes(players[nextPlayerIndex].name)) {
      nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
    }
  
    setCurrentPlayerIndex(nextPlayerIndex);
    setIsTimerActive(false);
    setTimer(600);
    setFlipped(false);
    setCurrentTargetPlayer(null);
    setApprovalMode(false);
    setCards((prevCards) => prevCards.slice(1));
  };
  
  

  // Mostrar las cartas respondidas en un modal
  const toggleAnsweredCards = () => {
    setShowAnsweredCards(!showAnsweredCards);
  };

  // Verificar si algún jugador ha ganado el juego
  const checkWinner = (updatedPlayers) => {
    let potentialWinner = null;

    updatedPlayers.forEach((player) => {
      if (player.starsToGive === 0) {
        if (
          !potentialWinner ||
          player.starsReceived > potentialWinner.starsReceived
        ) {
          potentialWinner = player;
        }
      }
    });

    if (potentialWinner) {
      setGameEnded(true);
      alert(`¡El ganador es ${potentialWinner.name} con ${potentialWinner.starsReceived} estrellas!`);
    }
  };

  return (
    <GameContainer>
      <h1>Juego de Cartas de Preguntas</h1>
      <RoundDisplay>Ronda Actual: {roundNumber}</RoundDisplay>
      {!players.length ? (
        <div>
          <Input
            type="number"
            value={numPlayers}
            onChange={(e) => setNumPlayers(parseInt(e.target.value))}
            min="2"
            max="8"
          />
          {[...Array(numPlayers)].map((_, index) => (
            <Input
              key={index}
              type="text"
              placeholder={`Nombre del jugador ${index + 1}`}
              value={playerNames[index] || ''}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
          ))}
          <Button onClick={handleSetPlayers}>Establecer jugadores</Button>
        </div>
      ) : gameEnded ? (
        <div>
          <h2>¡El juego ha terminado!</h2>
          <Button onClick={() => window.location.reload()}>Salir del Juego</Button>
        </div>
      ) : (
        <div>
          <h2>Turno de: {players[currentPlayerIndex].name}</h2>
          {currentTargetPlayer && (
            <h4>Destinatario: {currentTargetPlayer}</h4>
          )}
          <CardContainer onClick={handleCardFlip}>
            <CardInner flipped={flipped}>
              <CardFront>Pregunta</CardFront>
              <CardBack>{cards.length ? cards[0].texto : 'No hay más preguntas'}</CardBack>
            </CardInner>
          </CardContainer>
          {flipped && !currentTargetPlayer && (
            <div>
              <h3>Selecciona el jugador destinatario:</h3>
              {players.map((player) => (
                playersAnsweredThisRound.includes(player.name) || player.name === players[currentPlayerIndex].name ? (
                  <DisabledButton key={player.name} disabled>
                    {player.name}
                  </DisabledButton>
                ) : (
                  <Button
                    key={player.name}
                    onClick={() => handleSelectTargetPlayer(player.name)}
                  >
                    {player.name}
                  </Button>
                )
              ))}
            </div>
          )}
          {showConfirmButton && (
            <div>
              <Button onClick={handleConfirmTargetPlayer}>Confirmar Destinatario</Button>
            </div>
          )}
          {isTimerActive && (
            <div>
              <TimerDisplay>
                Temporizador: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </TimerDisplay>
              <Button onClick={() => handleResponse(true)}>Respondió la Pregunta</Button>
              <Button onClick={() => handleResponse(false)}>No Respondió la Pregunta</Button>
            </div>
          )}
          {approvalMode && (
            <ApprovalSection>
              <h3>¿Quién aprueba la respuesta?</h3>
              {players
                .filter((player) => player.name !== currentTargetPlayer)
                .map((player) => (
                  <ApprovalLabel key={player.name}>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleApprovalChange(player.name, e.target.checked)
                      }
                      disabled={player.starsToGive === 0}
                    />
                    {player.name} ({player.starsToGive} estrellas restantes)
                  </ApprovalLabel>
                ))}
              <Button onClick={finalizeTurn}>Enviar Aprobaciones y Pasar Turno</Button>
            </ApprovalSection>
          )}
          <Scoreboard>
            <h3>Tabla de Puntuaciones:</h3>
            <ul>
              {players.map((player) => (
                <li key={player.name}>
                  {player.name}: <span>{player.starsReceived}</span> estrellas recibidas,{' '}
                  <span>{player.starsToGive}</span> estrellas para dar
                </li>
              ))}
            </ul>
          </Scoreboard>
          <AnsweredCardsButton onClick={toggleAnsweredCards}>
            {showAnsweredCards ? 'Ocultar Cartas Respondidas' : 'Ver Cartas Respondidas'}
          </AnsweredCardsButton>
          {showAnsweredCards && (
            <ModalBackground onClick={toggleAnsweredCards}>
              <ModalContent>
                <h3>Cartas Respondidas:</h3>
                <ul>
                  {answeredCards.map((card, index) => (
                    <li key={index}>
                      Pregunta: "{card.question}", Respondida por: {card.targetPlayer}, Aprobada por:{' '}
                      {card.approvedBy.join(', ')}, Ronda: {card.round}
                    </li>
                  ))}
                </ul>
              </ModalContent>
            </ModalBackground>
          )}
          <HistoryContainer>
            <h3>Historial del Juego:</h3>
            {gameHistory.map((historyItem, index) => (
              <HistoryItem key={index}>
                <p>Turno {historyItem.turn} (Ronda {historyItem.round}):</p>
                <p>Jugador que preguntó: {historyItem.askingPlayer}</p>
                <p>Jugador que respondió: {historyItem.targetPlayer}</p>
                <p>Tiempo utilizado: {Math.floor(historyItem.timeSpent / 60)}:{(historyItem.timeSpent % 60).toString().padStart(2, '0')} minutos</p>
                <p>Jugadores que aprobaron: {historyItem.approvedBy.join(', ')}</p>
              </HistoryItem>
            ))}
          </HistoryContainer>
        </div>
      )}
    </GameContainer>
  );
};




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

export default CardGame;
