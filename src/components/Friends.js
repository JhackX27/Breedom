import React from 'react';

function Friends() {
  const friends = [
    { name: 'Amigo 1', lastMessage: 'Hola, ¿cómo estás?' },
    { name: 'Amigo 2', lastMessage: '¿Jugamos esta tarde?' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Amigos</h2>
      <div className="space-y-4">
        {friends.map((friend, index) => (
          <div key={index} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">{friend.name}</h3>
              <p className="text-gray-600">{friend.lastMessage}</p>
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friends;