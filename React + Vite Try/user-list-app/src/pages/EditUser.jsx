import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  // const params = useParams();
  // console.log(params);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  // Carica dati utente esistenti
  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({ name: data.name || '', email: data.email || '' });
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3001/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
    alert('Edit complete!');
      navigate('/');
    } else {
      console.error('Errore nella modifica');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Modifica Utente</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome"
        />
        <input
          className="border p-2 rounded"
          name="email"
          value={form.email.toLocaleLowerCase()}
          onChange={handleChange}
          placeholder="Email"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Salva
        </button>
      </form>
    </div>
  );
};

export default EditUser;
