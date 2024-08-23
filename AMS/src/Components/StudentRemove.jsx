import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function StudentRemove() {
  const [registerNumber, setRegisterNumber] = useState("");

  

  const handleChange = (e) => {
    setRegisterNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete('http://localhost:3001/removeStudent', {
        data: { registerNumber }  
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error removing student:', error);
      toast.error('Failed to remove student');
    }
    setRegisterNumber('')
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
      <h1>Remove Student</h1>
      <form onSubmit={handleSubmit} className="remove-student-form">
        <div className="form-group">
          <label htmlFor="registerNumber">Register Number:</label>
          <input
            type="text"
            id="registerNumber"
            name="registerNumber"
            value={registerNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Remove Student</button>
      </form>
    </div>
  );
}
