import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import Navbar from './components/Navbar';
import Map from './components/Map';
import Filter from './components/Filter';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './styles/App.css';
import Admin from './components/Admin';  // Import Admin component

function MainApp() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState([40.730610, -73.935242]); // Default center (New York City)
  const [mapZoom, setMapZoom] = useState(3); // Default zoom level
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const categories = ['All', 'Movies', 'Games', 'TV Series', 'Music'];
  const location = useLocation(); // Ensure this hook is within Router context
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLoc, setNewLoc] = useState({
    name: '',
    latitude: '',
    longitude: '',
    category: 'Movies',
    origin: ''
  });

  useEffect(() => {
    axios.get('/locations/')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleAddLocationSimple = async () => {
    // pede via prompt() — você pode trocar por modal se preferir
    const name = prompt('Nome da nova localização:');
    if (!name) return;

    const category = prompt('Categoria (Movies/Games/TV Series/Music):', 'Movies');
    if (!category) return;

    // pegar o centro atual do mapa como default
    // ou pedir lat/lng separados com prompt também
    const lat = parseFloat(prompt('Latitude:', String(mapCenter[0])));
    const lng = parseFloat(prompt('Longitude:', String(mapCenter[1])));
    if (isNaN(lat) || isNaN(lng)) {
      alert('Coordenadas inválidas');
      return;
    }

    try {
      const payload = { name, category, latitude: lat, longitude: lng, origin: category };
      const { data: created } = await axios.post('/locations', payload);
      
      // atualiza o state pra reaparecer no mapa imediatamente
      setLocations(prev => [...prev, created]);
      alert(`Localização “${created.name}” adicionada!`);
    } catch (err) {
      console.error(err);
      alert('Erro ao adicionar localização');
    }
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setNewLoc(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        name: newLoc.name,
        latitude: parseFloat(newLoc.latitude),
        longitude: parseFloat(newLoc.longitude),
        category: newLoc.category,
        origin: newLoc.origin
      };
      const { data: created } = await axios.post('/locations', payload);
      setLocations(prev => [...prev, created]);
      setShowAddForm(false);
      setNewLoc({ name: '', latitude: '', longitude: '', category: 'Movies', origin: '' });
    } catch (err) {
      console.error('Erro ao adicionar:', err);
      alert('Falha ao adicionar localização');
    }
  };




  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    
    // Set default location based on category
    switch (category) {
      case 'Movies':
        setMapCenter([34.052235, -118.243683]); // Los Angeles, CA
        setMapZoom(10);
        break;
      case 'Games':
        setMapCenter([35.6762, 139.6503]); // Tokyo, Japan
        setMapZoom(10);
        break;
      case 'TV Series':
        setMapCenter([51.507351, -0.127758]); // London, UK
        setMapZoom(10);
        break;
      case 'Music':
        setMapCenter([40.730610, -73.935242]); // New York City, NY
        setMapZoom(10);
        break;
      default:
        setMapCenter([40.730610, -73.935242]); // Default to New York City, NY
        setMapZoom(3);
        break;
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleLocationSelect = (location) => {
    setMapCenter([location.latitude, location.longitude]);
    setMapZoom(13);
    setSelectedCategory('All');
    setSelectedLocationId(location.id);
    setSearchTerm('');
  };

  const handleTheLastOfUsFilter = () => {
    setSelectedCategory('The Last of Us');
    // Set the default location for "The Last of Us"
    setMapCenter([39.8283, -98.5795]);
    setMapZoom(4);
  };

  const filteredLocations = locations.filter(location => {
    if (selectedCategory === '' || selectedCategory === 'All') {
      return true;
    }
    if (selectedCategory === 'The Last of Us') {
      return location.origin === 'The Last of Us';
    }
    return location.category === selectedCategory;
  });

  return (
    <div className="App">
      {location.pathname !== '/admin' && (
        <>
          <Navbar
            onSearch={setSearchTerm}
            onLocationSelect={loc => {
              setMapCenter([loc.latitude, loc.longitude]);
              setMapZoom(13);
              setSelectedLocationId(loc.id);
            }}
          />

          {/* container de “add + filtros” */}
          <div className="filter-container">
            {/* 1) botão que abre o form */}
            <button
              className="filter-button add-btn"
              onClick={() => setShowAddForm(show => !show)}
            >
              Adicionar localização
            </button>

            {/* 2) filtros normais */}
            <Filter
              categories={['All','Movies','Games','TV Series','Music']}
              onFilterChange={cat => { /* seu handler */ }}
            />
            <button className="filter-button" onClick={() => {/* last of us */}}>
              The Last of Us
            </button>
          </div>

          {/* 3) o formulário, só aparece quando showAddForm é true */}
          {showAddForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Adicionar Localização</h3>
                <form onSubmit={handleFormSubmit} className="add-form">
                  <input
                    name="name"
                    placeholder="Nome"
                    value={newLoc.name}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    name="latitude"
                    placeholder="Latitude"
                    value={newLoc.latitude}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    name="longitude"
                    placeholder="Longitude"
                    value={newLoc.longitude}
                    onChange={handleFormChange}
                    required
                  />
                  <select
                    name="category"
                    value={newLoc.category}
                    onChange={handleFormChange}
                  >
                    <option>Movies</option>
                    <option>Games</option>
                    <option>TV Series</option>
                    <option>Music</option>
                  </select>
                  <input
                    name="origin"
                    placeholder="Origem"
                    value={newLoc.origin}
                    onChange={handleFormChange}
                  />

                  <div className="modal-buttons">
                    <button type="submit" className="filter-button">
                      Salvar
                    </button>
                    <button
                      type="button"
                      className="filter-button"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Map
              locations={locations.filter(loc => {
                if (!selectedCategory || selectedCategory === 'All') return true;
                if (selectedCategory === 'The Last of Us')
                  return loc.origin === 'The Last of Us';
                return loc.category === selectedCategory;
              })}
              center={mapCenter}
              zoom={mapZoom}
              selectedLocationId={selectedLocationId}
            />
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}