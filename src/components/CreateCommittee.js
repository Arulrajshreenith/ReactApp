import React, { useState } from 'react';

function CreateCommittee() {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    members: '',
    duration: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Committee Data:', formData);
    alert('Committee created successfully!');
    // Add API call here
  };

  return (
    <div>
      <h2>Create New Committee</h2>
      <div className="card mt-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Committee Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Monthly Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Number of Members</label>
              <input
                type="number"
                className="form-control"
                name="members"
                value={formData.members}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration (months)</label>
              <input
                type="number"
                className="form-control"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Create Committee</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCommittee;