import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, SkipForward, Shuffle } from 'lucide-react';

const cardData = {
  "individual": [
    {
      "category": "Comunicación efectiva",
      "questions": [
        "¿Cómo puedes mejorar tu escucha activa?",
        "¿Qué estrategias usas para comunicarte claramente?"
      ],
      "roleplaying": "Practica dar feedback constructivo a un compañero"
    },
    {
      "category": "Manejo del estrés",
      "questions": [
        "¿Cuáles son tus técnicas favoritas para relajarte?",
        "¿Cómo manejas la presión en situaciones difíciles?"
      ],
      "roleplaying": "Demuestra una técnica de respiración para reducir el estrés"
    }
  ],
  "group": [
    {
      "category": "Trabajo en equipo",
      "questions": [
        "¿Cómo fomentas la colaboración en un grupo?",
        "¿Qué haces cuando hay un conflicto en el equipo?"
      ],
      "roleplaying": "Organiza una actividad de team building para tu grupo"
    },
    {
      "category": "Liderazgo",
      "questions": [
        "¿Qué cualidades crees que debe tener un buen líder?",
        "¿Cómo motivarías a un equipo desmotivado?"
      ],
      "roleplaying": "Dirige una breve reunión de equipo para establecer objetivos"
    }
  ]
};

const MenuCard = ({ title, color, onClick }) => (
  <div 
    className={`w-64 h-96 ${color} rounded-xl shadow-2xl cursor-pointer transform transition-transform duration-300 hover:scale-105`}
    onClick={onClick}
  >
    <div className="h-full flex flex-col items-center justify-center p-6 text-white">
      <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
      <div className="text-6xl mb-4">?</div>
      <p className="text-center">Haz clic para comenzar</p>
    </div>
  </div>
);

const QuestionCard = ({ category, question, isRoleplaying }) => (
  <div className="w-64 h-96 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-2xl p-6 flex flex-col text-white">
    <h3 className="text-xl font-bold mb-4">{category}</h3>
    <div className="flex-grow flex items-center justify-center">
      <p className="text-center">{question}</p>
    </div>
    {isRoleplaying && (
      <p className="text-sm italic mt-4">Este es un escenario de roleplaying</p>
    )}
  </div>
);

const CardGame = ({ onBack }) => {
  const [gameState, setGameState] = useState('menu');
  const [mode, setMode] = useState(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedCategories, setCompletedCategories] = useState([]);
  const [achievements, setAchievements] = useState(0);
  const [remainingCategories, setRemainingCategories] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (mode) {
      setRemainingCategories([...Array(cardData[mode].length).keys()]);
    }
  }, [mode]);

  const selectMode = (selectedMode) => {
    setMode(selectedMode);
    setGameState('randomMenu');
    resetGame();
  };

  const resetGame = () => {
    setCurrentCategoryIndex(0);
    setCurrentQuestionIndex(0);
    setCompletedCategories([]);
    setAchievements(0);
    setShowQuestion(false);
  };

  const startRandomQuestion = () => {
    if (remainingCategories.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingCategories.length);
      setCurrentCategoryIndex(remainingCategories[randomIndex]);
      setCurrentQuestionIndex(0);
      setShowQuestion(true);
      setGameState('playing');
    } else {
      setGameState('completed');
    }
  };

  const handleComplete = () => {
    if (currentQuestionIndex < 2) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const category = cardData[mode][currentCategoryIndex].category;
      if (!completedCategories.includes(category)) {
        setCompletedCategories([...completedCategories, category]);
        setAchievements(achievements + 1);
      }
      moveToNextCategory(true);
    }
  };

  const handleSkip = () => {
    moveToNextCategory(false);
  };

  const moveToNextCategory = (completed) => {
    if (!completed) {
      setRemainingCategories([...remainingCategories, currentCategoryIndex]);
    } else {
      setRemainingCategories(remainingCategories.filter(i => i !== currentCategoryIndex));
    }
    
    setGameState('randomMenu');
    setShowQuestion(false);
  };

  const getCurrentQuestion = () => {
    const category = cardData[mode][currentCategoryIndex];
    if (currentQuestionIndex < 2) {
      return category.questions[currentQuestionIndex];
    }
    return category.roleplaying;
  };

  const renderContent = () => {
    switch (gameState) {
      case 'menu':
        return (
          <div className="flex space-x-8">
            <MenuCard title="Preguntas Individuales" color="bg-red-500" onClick={() => selectMode('individual')} />
            <MenuCard title="Preguntas Grupales" color="bg-blue-500" onClick={() => selectMode('group')} />
          </div>
        );
      case 'randomMenu':
        return (
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-2xl font-bold mb-4 text-purple-700">Modo: {mode === 'individual' ? 'Individual' : 'Grupal'}</h3>
            <button
              onClick={startRandomQuestion}
              className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300 flex items-center text-lg font-semibold"
            >
              <Shuffle size={24} className="mr-2" /> Pregunta al Azar
            </button>
          </div>
        );
      case 'playing':
        const category = cardData[mode][currentCategoryIndex];
        return (
          <div className="flex flex-col items-center space-y-4">
            {showQuestion && (
              <QuestionCard 
                category={category.category}
                question={getCurrentQuestion()}
                isRoleplaying={currentQuestionIndex === 2}
              />
            )}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleComplete}
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 flex items-center"
              >
                <Check size={20} className="mr-2" /> Completado
              </button>
              <button
                onClick={handleSkip}
                className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-300 flex items-center"
              >
                <SkipForward size={20} className="mr-2" /> Saltar
              </button>
            </div>
          </div>
        );
      case 'completed':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-purple-700">¡Felicidades!</h3>
            <p className="mb-4">Has completado todas las categorías de este modo.</p>
            <button
              onClick={() => setGameState('menu')}
              className="px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300"
            >
              Volver al Menú Principal
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Juego de Resolución de Conflictos</h2>
        {renderContent()}
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-2 text-purple-700">Logros</h3>
        <p className="text-gray-700">Categorías completadas: {achievements} / {cardData.individual.length + cardData.group.length}</p>
        <div className="mt-2 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-600 h-2.5 rounded-full"
            style={{ width: `${(achievements / (cardData.individual.length + cardData.group.length)) * 100}%` }}
          ></div>
        </div>
      </div>

      <button onClick={onBack} className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition duration-300 flex items-center">
        <ArrowLeft size={20} className="mr-2" /> Volver a Juegos
      </button>
    </div>
  );
};

export default CardGame;