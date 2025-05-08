// src/components/LocationList.js
import React from 'react';
import axios from './axiosConfig';


function LocationList({ locations }) {
  return (
    <div>
      <h2>Location List</h2>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default LocationList;
