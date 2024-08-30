import React from 'react';

function Redeem({ points, setPoints }) {
  const services = [
    { name: 'Servicio Psicológico 1', cost: 100 },
    { name: 'Servicio Psicológico 2', cost: 200 },
  ];

  const handleRedeem = (cost) => {
    if (points >= cost) {
      setPoints(points - cost);
      alert('Servicio canjeado con éxito');
    } else {
      alert('No tienes suficientes puntos');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Canjear Servicios</h2>
      <p className="mb-4">Puntos disponibles: {points}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">{service.name}</h3>
            <p className="mb-2">Costo: {service.cost} puntos</p>
            <button 
              onClick={() => handleRedeem(service.cost)}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Canjear
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Redeem;