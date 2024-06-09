import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BidManagement from './BidManagement';
import './App.css';

const UserView = () => {
  const [tenders, setTenders] = useState([]);
  const [bids, setBids] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState({});
  const [bidAmount, setBidAmount] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedTenders = JSON.parse(localStorage.getItem('tenders')) || [];
    setTenders(storedTenders);
  }, []);

  const handleBidSubmit = (tenderId) => {
    const bid = parseFloat(bidAmount[tenderId]);
    if (isNaN(bid) || bid <= 0) return;

    const updatedTenders = tenders.map((tender) => {
      if (tender.id === tenderId) {
        const newBid = {
          userName: userName[tenderId] || 'Anonymous',
          bidTime: new Date(),
          bidCost: bid,
          lastMinuteFlag: (new Date(tender.endTime) - new Date()) <= 5 * 60 * 1000,
        };
        tender.bids.push(newBid);
        tender.bids.sort((a, b) => a.bidCost - b.bidCost);
        if (newBid.lastMinuteFlag) {
          tender.endTime = new Date(new Date(tender.endTime).getTime() + tender.bufferTime * 60 * 1000).toISOString();
          setNotifications((prev) => [...prev, `Tender ${tender.name} end time extended by ${tender.bufferTime} minutes due to a last-minute bid.`]);
        }
      }
      return tender;
    });
    setTenders(updatedTenders);
    localStorage.setItem('tenders', JSON.stringify(updatedTenders));
    setBids((prevBids) => ({
      ...prevBids,
      [tenderId]: updatedTenders.find((tender) => tender.id === tenderId).bids[0]?.bidCost || null
    }));
  };
  
  const handleUserNameChange = (tenderId, name) => {
    setUserName((prevNames) => ({ ...prevNames, [tenderId]: name }));
  };

  const handleBidAmountChange = (tenderId, amount) => {
    setBidAmount((prevAmounts) => ({ ...prevAmounts, [tenderId]: amount }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'user' && password === '1234') {
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
      <div className="container user-login">
        <h2>User Login</h2>
        <form onSubmit={handleLogin}>
          <input className='userlogin1' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input className='userlogin1' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container user-view">
      <h2 className='texthead'>User View</h2>
      <button onClick={handleLogout} className="btn btn-logout">Logout</button>
      {notifications.length > 0 && (
        <div className="notifications">
          <h3>Notifications</h3>
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
      )}
      <h3 className='texthead'>Available Tenders</h3>
      <table>
        <thead className='bid-table'>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Lowest Bid</th>
            <th>User Name</th>
            <th>Submit Bid</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td data-label="Name-">{tender.name}</td>
              <td data-label="Description-">{tender.description}</td>
              <td data-label="Lowest Bid-">{bids[tender.id] ? bids[tender.id] : 'No bids'}</td>
              <td data-label="User Name-">
                <input type="text" placeholder="User Name" onChange={(e) => handleUserNameChange(tender.id, e.target.value)} />
              </td>
              <td data-label="Submit Bid-">
                <input type="number" placeholder="Bid Amount" onChange={(e) => handleBidAmountChange(tender.id, e.target.value)} />
                <button onClick={() => handleBidSubmit(tender.id)} className="btn1">Submit Bid</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BidManagement tenders={tenders} />
    </div>
  );
};

export default UserView;
