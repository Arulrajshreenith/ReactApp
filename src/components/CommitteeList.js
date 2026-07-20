import React, { useState, useEffect } from 'react';

function CommitteeList() {
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample data - In production, fetch from API
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      const sampleData = [
        {
          id: 1,
          name: "Monthly Savings Chit",
          amount: 5000,
          members: 12,
          duration: 12,
          startDate: "2026-01-01",
          endDate: "2026-12-31",
          status: "Active",
          description: "Monthly chit fund for savings",
          createdBy: "Admin",
          createdAt: "2026-01-01"
        },
        {
          id: 2,
          name: "Weekly Business Chit",
          amount: 2000,
          members: 8,
          duration: 8,
          startDate: "2026-01-15",
          endDate: "2026-08-15",
          status: "Active",
          description: "Weekly chit for business owners",
          createdBy: "Admin",
          createdAt: "2026-01-15"
        },
        {
          id: 3,
          name: "Quarterly Investment Chit",
          amount: 10000,
          members: 6,
          duration: 6,
          startDate: "2026-02-01",
          endDate: "2026-07-01",
          status: "Pending",
          description: "Quarterly chit for investments",
          createdBy: "Admin",
          createdAt: "2026-02-01"
        },
        {
          id: 4,
          name: "Yearly Gold Chit",
          amount: 15000,
          members: 10,
          duration: 10,
          startDate: "2025-06-01",
          endDate: "2026-03-01",
          status: "Completed",
          description: "Yearly chit for gold purchase",
          createdBy: "Admin",
          createdAt: "2025-06-01"
        }
      ];
      setCommittees(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter committees based on search
  const filteredCommittees = committees.filter(committee =>
    committee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    committee.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    committee.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'active':
        return 'bg-success';
      case 'pending':
        return 'bg-warning';
      case 'completed':
        return 'bg-info';
      case 'cancelled':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate progress percentage
  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    const total = end - start;
    const elapsed = now - start;
    return Math.round((elapsed / total) * 100);
  };

  // Handle view details
  const handleViewDetails = (committee) => {
    setSelectedCommittee(committee);
    setShowModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCommittee(null);
  };

  // Handle delete committee
  const handleDeleteCommittee = (id) => {
    if (window.confirm('Are you sure you want to delete this committee?')) {
      setCommittees(committees.filter(c => c.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading committees...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Committees</h2>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = '/create-committee'}
        >
          <i className="bi bi-plus-circle"></i> Create New Committee
        </button>
      </div>

      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, description, or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="btn btn-outline-secondary"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <select className="form-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h6 className="card-title">Total Committees</h6>
              <h3>{committees.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h6 className="card-title">Active</h6>
              <h3>{committees.filter(c => c.status === 'Active').length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h6 className="card-title">Pending</h6>
              <h3>{committees.filter(c => c.status === 'Pending').length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h6 className="card-title">Completed</h6>
              <h3>{committees.filter(c => c.status === 'Completed').length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Committees List */}
      {filteredCommittees.length === 0 ? (
        <div className="alert alert-info">
          <i className="bi bi-info-circle"></i> No committees found. 
          <a href="/create-committee" className="alert-link"> Create your first committee!</a>
        </div>
      ) : (
        <div className="row">
          {filteredCommittees.map((committee) => (
            <div key={committee.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <h5 className="card-title">{committee.name}</h5>
                    <span className={`badge ${getStatusBadge(committee.status)}`}>
                      {committee.status}
                    </span>
                  </div>
                  
                  <p className="card-text text-muted small">{committee.description}</p>
                  
                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Amount:</span>
                      <strong>{formatCurrency(committee.amount)}</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Members:</span>
                      <span>{committee.members}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Duration:</span>
                      <span>{committee.duration} months</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Created:</span>
                      <span>{formatDate(committee.createdAt)}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="d-flex justify-content-between small">
                      <span>{formatDate(committee.startDate)}</span>
                      <span>{calculateProgress(committee.startDate, committee.endDate)}%</span>
                      <span>{formatDate(committee.endDate)}</span>
                    </div>
                    <div className="progress" style={{height: '5px'}}>
                      <div 
                        className="progress-bar bg-primary" 
                        style={{width: `${calculateProgress(committee.startDate, committee.endDate)}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="card-footer bg-transparent">
                  <div className="btn-group w-100" role="group">
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleViewDetails(committee)}
                    >
                      <i className="bi bi-eye"></i> View
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteCommittee(committee.id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Committee Details */}
      {showModal && selectedCommittee && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Committee Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Basic Information</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Name:</strong></td>
                          <td>{selectedCommittee.name}</td>
                        </tr>
                        <tr>
                          <td><strong>Status:</strong></td>
                          <td>
                            <span className={`badge ${getStatusBadge(selectedCommittee.status)}`}>
                              {selectedCommittee.status}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Amount:</strong></td>
                          <td>{formatCurrency(selectedCommittee.amount)}</td>
                        </tr>
                        <tr>
                          <td><strong>Members:</strong></td>
                          <td>{selectedCommittee.members}</td>
                        </tr>
                        <tr>
                          <td><strong>Duration:</strong></td>
                          <td>{selectedCommittee.duration} months</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h6>Dates</h6>
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td><strong>Start Date:</strong></td>
                          <td>{formatDate(selectedCommittee.startDate)}</td>
                        </tr>
                        <tr>
                          <td><strong>End Date:</strong></td>
                          <td>{formatDate(selectedCommittee.endDate)}</td>
                        </tr>
                        <tr>
                          <td><strong>Created:</strong></td>
                          <td>{formatDate(selectedCommittee.createdAt)}</td>
                        </tr>
                        <tr>
                          <td><strong>Created By:</strong></td>
                          <td>{selectedCommittee.createdBy}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-3">
                  <h6>Description</h6>
                  <p>{selectedCommittee.description}</p>
                </div>
                <div className="mt-3">
                  <h6>Progress</h6>
                  <div className="progress">
                    <div 
                      className="progress-bar bg-primary" 
                      style={{width: `${calculateProgress(selectedCommittee.startDate, selectedCommittee.endDate)}%`}}
                    >
                      {calculateProgress(selectedCommittee.startDate, selectedCommittee.endDate)}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary" 
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button className="btn btn-primary">
                  <i className="bi bi-pencil"></i> Edit Committee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommitteeList;