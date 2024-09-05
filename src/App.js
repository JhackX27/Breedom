import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Friends from './components/Friends';
import Games from './components/Games';
import Redeem from './components/Redeem';
import Ads from './components/Ads';
import Profile from './components/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [points, setPoints] = useState(500);
  const [achievements, setAchievements] = useState(0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'friends':
        return <Friends />;
      case 'games':
        return <Games achievements={achievements} setAchievements={setAchievements} />;
      case 'redeem':
        return <Redeem points={points} setPoints={setPoints} />;
      case 'ads':
        return <Ads />;
      case 'profile':
        return <Profile points={points} achievements={achievements} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setCurrentPage={setCurrentPage} />
      <main className="container mx-auto mt-8 p-4">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;