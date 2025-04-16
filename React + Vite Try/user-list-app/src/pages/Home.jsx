import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const filtered = 
  users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Sei sicuro di voler eliminare questo utente?");
    if (!confirmed) return;
    const res = await fetch(`http://localhost:3001/users/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setUsers(prev => prev.filter(user => user.id !== id));
      console.log(`Utente con ID ${id} eliminato`);
    } else {
      console.error('Error DELETE');
    }
  };

  if (!users) return <p className="p-4">Caricamento...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista Utenti</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Cerca utente"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-blue-500 text-white px-4 rounded cursor-pointer hover:bg-blue-600"
        >
          {sortAsc ? 'A→Z' : 'Z→A'}
        </button>
      </div>
      {filtered.map(user => (
        <div key={user.id} className="bg-white shadow p-4 mb-3 rounded">
          <Link to={`/user/${user.id}`} className="text-xl font-bold text-blue-600 hover:underline">
            {user.name}
          </Link>
          <p className="text-gray-600">{user.email.toLowerCase()}</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleDelete(user.id)}
              className="text-red-500 mt-2 hover:underline cursor-pointer"
            >
              Delete
            </button>
            <Link to={`edit/user/${user.id}`}
              className="text-blue-600 font-bold hover:text-blue-800 mt-2 hover:underline cursor-pointer"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
