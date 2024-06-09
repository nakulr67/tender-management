import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const AppNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Tender Management System</div>
      <div className="navbar-links">
        <Link to="/admin" className="nav-link">Admin Panel</Link>
        <Link to="/user" className="nav-link">User View</Link>
      </div>
    </nav>
  );
};
export default AppNavbar;
