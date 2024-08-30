import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, X } from 'lucide-react';

function Friends() {
  const [friends, setFriends] = useState([
    { id: 1, name: 'Ana García', status: 'online', lastMessage: '¿Jugamos esta tarde?', avatar: '/api/placeholder/100' },
    { id: 2, name: 'Carlos López', status: 'offline', lastMessage: 'Gracias por la ayuda', avatar: '/api/placeholder/100' },
    { id: 3, name: 'María Rodríguez', status: 'online', lastMessage: 'Vi un juego que te puede gustar', avatar: '/api/placeholder/100' },
  ]);
  const [publicUsers, setPublicUsers] = useState([
    { id: 4, name: 'Juan Pérez', status: 'online', avatar: '/api/placeholder/100' },
    { id: 5, name: 'Laura Gómez', status: 'offline', avatar: '/api/placeholder/100' },
    { id: 6, name: 'Pedro Sánchez', status: 'online', avatar: '/api/placeholder/100' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [activeTab, setActiveTab] = useState('friends');

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPublicUsers = publicUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFriend = (user) => {
    if (!friends.some(friend => friend.id === user.id)) {
      const newFriend = { 
        ...user, 
        lastMessage: '¡Hola! Acabo de agregarte como amigo' 
      };
      setFriends([...friends, newFriend]);
      setPublicUsers(publicUsers.filter(u => u.id !== user.id));
    }
  };

  const removeFriend = (id) => {
    const removedFriend = friends.find(friend => friend.id === id);
    setFriends(friends.filter(friend => friend.id !== id));
    if (removedFriend) {
      setPublicUsers([...publicUsers, removedFriend]);
    }
    if (selectedFriend && selectedFriend.id === id) {
      setSelectedFriend(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Amigos y Usuarios</h2>
      
      <div className="flex mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar usuarios..."
            className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab('friends')}
          className={`flex-1 py-2 ${activeTab === 'friends' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Mis Amigos
        </button>
        <button
          onClick={() => setActiveTab('public')}
          className={`flex-1 py-2 ${activeTab === 'public' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Usuarios Públicos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
          <h3 className="text-xl font-semibold p-4 bg-blue-100 text-blue-800">
            {activeTab === 'friends' ? 'Lista de Amigos' : 'Usuarios Públicos'}
          </h3>
          <ul className="divide-y divide-gray-200">
            {activeTab === 'friends' 
              ? filteredFriends.map(friend => (
                  <li key={friend.id} className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                    <div className="flex items-center" onClick={() => setSelectedFriend(friend)}>
                      <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold">{friend.name}</p>
                        <p className="text-sm text-gray-500">{friend.status}</p>
                      </div>
                    </div>
                    <button onClick={() => removeFriend(friend.id)} className="text-red-500 hover:text-red-700">
                      <X size={20} />
                    </button>
                  </li>
                ))
              : filteredPublicUsers.map(user => (
                  <li key={user.id} className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.status}</p>
                      </div>
                    </div>
                    <button onClick={() => addFriend(user)} className="text-green-500 hover:text-green-700">
                      <UserPlus size={20} />
                    </button>
                  </li>
                ))
            }
          </ul>
        </div>

        <div className="md:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
          {selectedFriend ? (
            <div className="p-4">
              <div className="flex items-center mb-4">
                <img src={selectedFriend.avatar} alt={selectedFriend.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h3 className="text-2xl font-semibold">{selectedFriend.name}</h3>
                  <p className="text-gray-500">{selectedFriend.status}</p>
                </div>
              </div>
              <p className="mb-4 text-gray-700">Último mensaje: {selectedFriend.lastMessage}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 flex items-center">
                <MessageCircle size={20} className="mr-2" />
                Enviar mensaje
              </button>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              Selecciona un amigo para ver más detalles
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Friends;