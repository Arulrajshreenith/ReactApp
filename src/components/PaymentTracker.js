import React, { useState } from 'react';

function PaymentTracker() {
  const [payments, setPayments] = useState([
    { id: 1, member: 'John Doe', amount: 5000, date: '2026-01-15', status: 'Paid' },
    { id: 2, member: 'Jane Smith', amount: 5000, date: '2026-01-15', status: 'Pending' },
    { id: 3, member: 'Bob Johnson', amount: 5000, date: '2026-01-15', status: 'Paid' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment =>
    payment.member.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    return status === 'Paid' ? 'badge bg-success' : 'badge bg-warning';
  };

  return (
    <div>
      <h2>Payment Tracker</h2>
      <div className="mb-3 mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by member name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Member</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.member}</td>
              <td>₹{payment.amount}</td>
              <td>{payment.date}</td>
              <td><span className={getStatusBadge(payment.status)}>{payment.status}</span></td>
              <td>
                <button className="btn btn-sm btn-primary">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTracker;