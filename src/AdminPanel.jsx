import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BidManagement from './BidManagement';
import './App.css';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tenders, setTenders] = useState([]);
  const [newTender, setNewTender] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    bufferTime: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedTenders = JSON.parse(localStorage.getItem('tenders')) || [];
    setTenders(storedTenders);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTender({ ...newTender, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTenders = [...tenders, { ...newTender, id: Date.now(), bids: [] }];
    setTenders(updatedTenders);
    localStorage.setItem('tenders', JSON.stringify(updatedTenders));
  };

  const handleDelete = (tenderId) => {
    const updatedTenders = tenders.filter(tender => tender.id !== tenderId);
    setTenders(updatedTenders);
    localStorage.setItem('tenders', JSON.stringify(updatedTenders));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'nakul' && password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    navigate('/');
  };

  if (!isLoggedIn) {
    return (
      <div className="container admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input className='admin-input' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input className='admin-input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container admin-panel">
      <h2>Admin Panel</h2>
      <button onClick={handleLogout} className="btn btn-logout">Logout</button>
      <form onSubmit={handleSubmit} className="tender-form">
        <input type="text" name="name" placeholder="Tender Name" value={newTender.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={newTender.description} onChange={handleChange} required></input>
        <input type="datetime-local" name="startTime" value={newTender.startTime} onChange={handleChange} required />
        <input className="padded-input" type="datetime-local" name="endTime" value={newTender.endTime} onChange={handleChange} required />
        <input type="number" name="bufferTime" placeholder="Buffer Time (minutes)" value={newTender.bufferTime} onChange={handleChange} required />
        <button type="submit" className="btn">Create Tender</button>
      </form>
      <h3>Previous Tenders</h3>
      <table>
        <thead>
          <tr className='tabllehead'>
            <th>Name</th>
            <th>Description</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td>{tender.name}</td>
              <td>{tender.description}</td>
              <td>{new Date(tender.startTime).toLocaleString()}</td>
              <td>{new Date(tender.endTime).toLocaleString()}</td>
              <td>
                <button onClick={() => handleDelete(tender.id)} className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BidManagement tenders={tenders} />
    </div>
  );
};

export default AdminPanel;
