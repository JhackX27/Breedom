import React from 'react';

function Profile({ points }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-xl mb-2">Puntos actuales: {points}</p>
        <p className="mb-4">Nombre de usuario: Usuario123</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Editar Perfil
        </button>
      </div>
    </div>
  );
}

export default Profile;