import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Utente aggiunto:', { name, email });
  //   alert(`Utente "${name}" aggiunto!`);
  //   navigate('/');
  // };

  useEffect(() => {
    fetch_users_id();
  }, [])

  const fetch_users_id = async () => {
    const res = await fetch('http://localhost:3001/users');
    const data = await res.json();
    console.log(data);
    const max_id = Math.max(...data.map(user => Number(user.id)).filter(id => !isNaN(id)));
    console.log('ID più alto:', max_id);
    setId(max_id);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id + 1,
        name: name,
        email: email
      }),
    })
    .then(res => res.json())
    .then(data => console.log('Creato', data))
    alert(`Utente "${name}" aggiunto!`);
    navigate('/');
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Aggiungi Utente</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
          Aggiungi
        </button>
      </form>
    </div>
  );
}

export default AddUser;
