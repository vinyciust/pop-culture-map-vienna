import React, { useState } from 'react';
import '../styles/AdminSidebar.css';

function AdminSidebar({ onSelect }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <div className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button onClick={toggleCollapse} className="sidebar-toggle">
        {collapsed ? '>' : '<'}
      </button>
      <ul className="sidebar-menu">
        <li onClick={() => onSelect('locations')}>Locations</li>
        <li onClick={() => onSelect('filters')}>Filters</li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
