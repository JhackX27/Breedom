import React from 'react';

function Navbar({ setCurrentPage }) {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button onClick={() => setCurrentPage('home')} className="text-white text-2xl font-bold">Breedom</button>
        <div className="space-x-4">
          <button onClick={() => setCurrentPage('friends')} className="text-white hover:bg-blue-700 px-3 py-2 rounded">Amigos</button>
          <button onClick={() => setCurrentPage('games')} className="text-white hover:bg-blue-700 px-3 py-2 rounded">Juegos</button>
          <button onClick={() => setCurrentPage('redeem')} className="text-white hover:bg-blue-700 px-3 py-2 rounded">Canjear</button>
          <button onClick={() => setCurrentPage('ads')} className="text-white hover:bg-blue-700 px-3 py-2 rounded">Anuncios</button>
          <button onClick={() => setCurrentPage('profile')} className="text-white hover:bg-blue-700 px-3 py-2 rounded">Yo</button>
          <button className="text-white hover:bg-blue-700 px-3 py-2 rounded">Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;