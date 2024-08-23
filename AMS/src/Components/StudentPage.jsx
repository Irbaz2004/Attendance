import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function StudentPage() {
  const [formData, setFormData] = useState({
    name: '',
    registerNumber: '',
    yearOfStudying: '',
    branchOfStudying: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/addStudent', formData);
      toast.success(response.data.message);
  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('Failed to add student');
  }
  setFormData({
    name: '',
    registerNumber: '',
    yearOfStudying: '',
    branchOfStudying: '',
    gender: '',
  });
  };

  return (
    <div className="form-container">
            <ToastContainer  position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

      <h1>Add Student</h1>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerNumber">Register Number:</label>
          <input
            type="text"
            id="registerNumber"
            name="registerNumber"
            value={formData.registerNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearOfStudying">Year of Studying:</label>
          <input
            type="text"
            id="yearOfStudying"
            name="yearOfStudying"
            value={formData.yearOfStudying}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="branchOfStudying">Branch of Studying:</label>
          <input
            type="text"
            id="branchOfStudying"
            name="branchOfStudying"
            value={formData.branchOfStudying}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Student</button>
      </form>
    </div>
  );
}
