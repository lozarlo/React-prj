import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <p className="p-4">Caricamento...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>Username: {user.username}</p>
      <p>{user.email.toLowerCase()}</p>
      <p>City: {user.address.city}</p>
      <p>Street: {user.address.street}</p>
      <p>Zipcode: {user.address.zipcode}</p>
      <p>Latitude: {user.address.geo.lat}</p>
      <p>Longitude: {user.address.geo.lng}</p>
      <Link to="/" className="text-blue-500 mt-4 block">← Torna alla lista</Link>
    </div>
  );
}

export default UserDetails;
