import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navbar() {

  const locate_url = useLocation();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold">UserListApp</Link>
      {
        locate_url.pathname == "/add" ? null :
        <Link to="/add" className="hover:underline">Aggiungi Utente</Link>
      }
    </nav>
  );
}

export default Navbar;
