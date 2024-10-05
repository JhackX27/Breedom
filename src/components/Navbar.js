import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar({ setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Actualizamos los items del menú para incluir "Juego de Cartas"
  const navItems = [
    { name: 'Amigos', page: 'friends' },
    { name: 'Juegos', page: 'games' },
    { name: 'Canjear', page: 'redeem' },
    { name: 'Anuncios', page: 'ads' },
    { name: 'Yo', page: 'profile' },
    { name: 'Juego de Cartas', page: 'cardgame' }, // Nueva opción para Juego de Cartas
  ];

  const NavButton = ({ name, page }) => (
    <button 
      onClick={() => {
        setCurrentPage(page);
        setIsOpen(false);
      }} 
      className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-300"
    >
      {name}
    </button>
  );

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <button onClick={() => setCurrentPage('home')} className="text-white text-2xl font-bold">
            Breedom
          </button>
          
          <div className="hidden md:flex space-x-4">
            {/* Renderizamos todos los items del menú */}
            {navItems.map((item) => (
              <NavButton key={item.page} {...item} />
            ))}
            <button className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-300">
              Cerrar Sesión
            </button>
          </div>
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Menú móvil */}
        {isOpen && (
          <div className="mt-4 md:hidden">
            {navItems.map((item) => (
              <NavButton key={item.page} {...item} />
            ))}
            <button 
              className="text-white hover:bg-blue-700 px-3 py-2 rounded transition duration-300 block w-full text-left"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
