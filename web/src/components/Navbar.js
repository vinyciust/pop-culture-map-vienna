import React, { useState } from 'react';
import axios from '../axiosConfig';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ onSearch, onLocationSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleInputChange = async (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.length > 1) {
            try {
                const response = await axios.get(`/locations/?search=${term}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching search suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (location) => {
        setSearchTerm(''); 
        setSuggestions([]); 
        onLocationSelect(location); 
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSuggestions([]);
    };

    return (
        <div className="navbar-container">
            <div className="navbar">
                <div className="navbar-logo">pop culture map</div>
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Search for a location..."
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                    <FaTimes className="clear-icon" onClick={handleClearSearch} />
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((location) => (
                                <li
                                    key={location.id}
                                    onClick={() => handleSelectSuggestion(location)}
                                    className="suggestion-item"
                                >
                                    <strong>{location.name}</strong> | {location.origin} | {location.category} | {location.city}, {location.country}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="navbar-auth">
                    <button className="navbar-auth-button" onClick={() => navigate('/admin')}>
                        admin
                    </button>
                    <button className="navbar-auth-button">join</button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
