import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Ensure this import is correct

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to the Tender Management System</h2>
      <div className="card-container">
        <div className="home-card">
          <h3>Admin Panel</h3>
          <p>Manage tenders and view bids.</p>
          <Link to="/admin">
            <button className="btn">Go to Admin Panel</button>
          </Link>
        </div>
        <div className="home-card">
          <h3>User View</h3>
          <p>View available tenders and submit bids.</p>
          <Link to="/user">
            <button className="btn">Go to User View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
