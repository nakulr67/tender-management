import React from 'react';
import './App.css';

const BidManagement = ({ tenders }) => {
  return (
    <div className="bid-management">
      <h3 className='texthead'>Bid Management</h3>
      <table>
        <thead  className='bid-table'>
          <tr>
            <th>Tender Name</th>
            <th>Bids</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => (
            <tr key={tender.id}>
              <td>{tender.name}</td>
              <td>
                {tender.bids.length > 0 ? (
                  <ul>
                    {tender.bids.map((bid, index) => (
                      <li key={index}>
                        {bid.userName} - ${bid.bidCost} (at {new Date(bid.bidTime).toLocaleString()})
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No bids'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BidManagement;
