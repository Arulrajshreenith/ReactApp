import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [committees, setCommittees] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Sample data - replace with API calls
    const sampleCommittees = [
      { id: 1, name: "Monthly Chit", amount: 5000, members: 10, status: "Active" },
      { id: 2, name: "Weekly Chit", amount: 2000, members: 8, status: "Active" }
    ];
    setCommittees(sampleCommittees);
    setTotalMembers(18);
    setTotalAmount(7000);
  }, []);

  return (
    <div>
      <h2>Dashboardss</h2>
      <h1>Test code </h1>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Committees</h5>
              <h2>{committees.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-info mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Members</h5>
              <h2>{totalMembers}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Amount</h5>
              <h2>₹{totalAmount}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h4>Recent Committees</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Members</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {committees.map(committee => (
              <tr key={committee.id}>
                <td>{committee.name}</td>
                <td>₹{committee.amount}</td>
                <td>{committee.members}</td>
                <td><span className="badge bg-success">{committee.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;