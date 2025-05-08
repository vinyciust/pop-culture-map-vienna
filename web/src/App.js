// src/App.js
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

  useEffect(() => {
    axios.get('/locations/')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

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
      {/* Only show Navbar and Filters if not on the admin page */}
      {location.pathname !== '/admin' && (
        <>
          <Navbar onSearch={handleSearch} onLocationSelect={handleLocationSelect} searchTerm={searchTerm} />
          <div className="filter-container">
            <Filter categories={categories} onFilterChange={handleFilterChange} />
            <button className="filter-button" onClick={handleTheLastOfUsFilter}>The Last of Us</button>
          </div>
        </>
      )}
      
      <Routes>
        <Route
          path="/"
          element={
            <Map
              locations={filteredLocations}
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

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
  