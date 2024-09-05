import React, { useState } from 'react';

function Profile({ points, achievements }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'Usuario123',
    email: 'usuario123@example.com',
    registrationDate: '2023-01-01'
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
    // Aquí iría la lógica para guardar los cambios si isEditing era true
  };


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <div className="bg-white p-4 rounded shadow">
        {isEditing ? (
          // Formulario de edición
          <div>
            <input
              type="text"
              value={userData.username}
              onChange={(e) => setUserData({...userData, username: e.target.value})}
              className="mb-2 w-full p-2 border rounded"
            />
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              className="mb-2 w-full p-2 border rounded"
            />
          </div>
        ) : (
          // Visualización de datos
          <>
            <p className="text-xl mb-2">Puntos actuales: {points}</p>
            <p className="mb-2">Nombre de usuario: {userData.username}</p>
            <p className="mb-2">Email: {userData.email}</p>
            <p className="mb-2">Fecha de registro: {userData.registrationDate}</p>
            <p className="mb-4">Logros desbloqueados: {achievements}</p>
          </>
        )}
        <button 
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Guardar cambios' : 'Editar Perfil'}
        </button>
      </div>
    </div>
  );
}

export default Profile;