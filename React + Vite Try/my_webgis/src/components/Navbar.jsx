import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [query, setQuery] = useState("");
  const [showAge, setShowAge] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      props.onSearch(query.trim());
    }
  };

  const handleToggle = () => {
    const newState = !showAge;
    setShowAge(newState);
    props.onTogglePopulationLabels(newState);
  };


  return (
    <nav className="bg-white border-b border-gray-200 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">🌐 WebGIS Viewer</h1>
        <div className="flex items-center gap-6">
          <ul className="flex gap-4 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 cursor-pointer">Mappa</Link>
            <Link to="/data" className="hover:text-blue-600 cursor-pointer">Dati</Link>
            <Link to="/about" className="hover:text-blue-600 cursor-pointer">Info</Link>
          </ul>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              id="search-country"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca un paese..."
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:border-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              Cerca
            </button>
          </form>
          <button
            onClick={handleToggle}
            className={`text-sm p-1 rounded border ${showAge ? 'bg-green-500 text-white py-[5px] px-[8px]' : 'border-gray-500 text-gray-700 hover:bg-gray-100 cursor-pointer'}`}
          >
            {showAge ? "Nascondi Popolazione" : "Mostra Popolazione"}
          </button>
        </div>
      </div>
    </nav>
  );
}