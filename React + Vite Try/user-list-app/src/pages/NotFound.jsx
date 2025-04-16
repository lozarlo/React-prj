import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p>Pagina non trovata.</p>
      <Link to="/" className="text-blue-600 underline">Torna alla home</Link>
    </div>
  );
}

export default NotFound;
