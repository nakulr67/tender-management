import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import Home from './Home';
import AdminPanel from './AdminPanel';
import UserView from './UserView';
import './App.css';

const App = () => {
  return (
    <Router>
      <AppNavbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/user" element={<UserView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
