import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import LocationManager from './LocationManager'; // Component to manage locations
import '../styles/Admin.css';


function Admin() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };
  
 
  return (
    <div className="admin-container">

      <div className="admin-navbar">
        <span onClick={() => navigate('/')} className="admin-navbar-logo">
          pop culture map administration
        </span>
        <button className="back-button" onClick={handleBackClick}>back</button>
      </div>
      <div className="admin-body">
        <AdminSidebar />
        <div className="admin-content">
          {/* Render LocationManager or FilterManager based on the sidebar selection */}
          <LocationManager />
        </div>
      </div>
    </div>
  );
}

export default Admin;
