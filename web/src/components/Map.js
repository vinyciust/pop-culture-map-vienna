// src/components/Map.js
import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/App.css';

// Custom icons
const movieIcon = new L.Icon({
  iconUrl: require('../images/movie.png'),  // Path to your custom movie icon image
  iconSize: [25, 25], // Size of the icon
});

const gameIcon = new L.Icon({
  iconUrl: require('../images/games.png'),  // Path to your game icon image
  iconSize: [25, 25],  // Adjust size as needed
});

const seriesIcon = new L.Icon({
  iconUrl: require('../images/series.png'),  // Path to your game icon image
  iconSize: [25, 25],  // Adjust size as needed
});

const musicIcon = new L.Icon({
  iconUrl: require('../images/music.png'),  // Path to your game icon image
  iconSize: [25, 25],  // Adjust size as needed
});

const defaultIcon = new L.Icon({
  iconUrl: require('../images/red.png'),  // Path to your default icon image or any other category icon
  iconSize: [25, 25], 
});

const UpdateMapCenter = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

function Map({ locations, center, zoom, selectedLocationId }) {  // Accept selectedLocationId as a prop
  const markerRefs = useRef({});  // Use a ref to store marker references

  useEffect(() => {
    if (selectedLocationId && markerRefs.current[selectedLocationId]) {
      markerRefs.current[selectedLocationId].openPopup();  // Open the popup programmatically
    }
  }, [selectedLocationId]);  // Run this effect when selectedLocationId changes

  return (
    <div className="map-wrapper">
      <MapContainer center={center} zoom={zoom} className="map-container">
        <UpdateMapCenter center={center} zoom={zoom} /> {/* Update center and zoom */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => {
          let iconToUse;
          if (location.category === 'Movies') {
            iconToUse = movieIcon;
          } else if (location.category === 'Games') {
            iconToUse = gameIcon;
          } else if (location.category === 'TV Series') {
            iconToUse = seriesIcon;
          } else if (location.category === 'Music') {
            iconToUse = musicIcon;
          } else {
            iconToUse = defaultIcon;
          }

          // Generate Google Maps link using latitude and longitude
          const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;

          return (
            <Marker 
              key={location.id} 
              position={[location.latitude, location.longitude]} 
              icon={iconToUse}
              ref={el => (markerRefs.current[location.id] = el)}  // Store marker ref
            >
              <Popup>
                <div className="popup-content">
                  {location.image_url && (
                    <div className="popup-image-container">
                      <img
                        src={location.image_url}
                        alt={location.name}
                        className="popup-image"
                      />
                    </div>
                  )}
                  <div className="popup-text">
                    <h3>{location.name}</h3>
                    <p><strong>Description:</strong> {location.description}</p>
                    <p><strong>Category:</strong> {location.category}</p>
                    <p><strong>Origin:</strong> {location.origin}</p>
                    <p><strong>City:</strong> {location.city}</p>
                    <p><strong>Country:</strong> {location.country}</p>
                    <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>  
  );
}

export default Map;
