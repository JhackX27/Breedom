import React from 'react';

function Ads() {
  const events = [
    { name: 'Evento Presencial', date: '09/09/2024' },
    { name: 'Evento Online', date: '15/09/2024' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Anuncios y Eventos</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">{event.name}</h3>
            <p className="mb-2">Fecha: {event.date}</p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Más Información
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ads;