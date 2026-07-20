import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CreateCommittee from './components/CreateCommittee';
import CommitteeList from './components/CommitteeList';
import PaymentTracker from './components/PaymentTracker';
import Login from './components/Login';

function App() {
  return (
    <Router> 
      <div className="App">
        <Navbar /> 
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-committee" element={<CreateCommittee />} />
            <Route path="/committees" element={<CommitteeList />} />
            <Route path="/payments" element={<PaymentTracker />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;