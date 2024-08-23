import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  const [registerNumber, setRegisterNumber] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users: ', error));
  }, []);

  const handleSearch = () => {
    const filteredStudents = users.filter(student =>
      student.registerNumber.includes(registerNumber)
    );
  
    if (filteredStudents.length === 0) {
      setMessage('No student found with this register number.');
    } else {
      setMessage('');
    }
  
    setStudentData(filteredStudents);
  
    const attendanceData = filteredStudents.reduce((acc, student) => {
      acc[student.registerNumber] = student.attendance;
      return acc;
    }, {});
    setAttendance(attendanceData);
  };

  const handleAttendanceChange = (registerNumber, value) => {
    setAttendance(prev => ({
      ...prev,
      [registerNumber]: value,
    }));    
  };

  const handleUpdate = async () => {
    try {
      await Promise.all(
        studentData.map(student =>
          axios.put('http://localhost:3001/updateAttendance', {
            registerNumber: student.registerNumber,
            attendance: attendance[student.registerNumber] || 'Absent' 
          })
        )
      );
      toast.success('Attendance updated successfully');
    } catch (error) {
      console.error('Error updating attendance:', error);
      toast.error('Failed to update attendance');
    }
    setRegisterNumber('')
  };
  

  const handleDownload = () => {
    const data = studentData
      .map(
        student =>
          `Name: ${student.name}\nRegister Number: ${student.RegisterNo}\nAttendance: ${attendance[student.RegisterNo]}\n`
      )
      .join('\n');
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'attendance.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Attendance Downloaded successfully');
  };

  return (
    <div className="home-container">
            <ToastContainer  position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

      <h1 className="title">Student Attendance System</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Register Number"
          value={registerNumber}
          onChange={(e) => setRegisterNumber(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {message && <p className="message">{message}</p>}

      {studentData.length > 0 && (
        <div className="student-details">
          <h2>Student Details</h2>
          {studentData.map((student) => (
            <div key={student.registerNumber} className="student-info">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Register Number:</strong> {student.registerNumber}</p>
              <div className="attendance-section">
                <label>Attendance:</label>
                <div className="attendance-options">
                  <label>
                    <input
                      type="radio"
                      value="Present"
                      checked={attendance[student.registerNumber] === 'Present'}
                      onChange={(e) =>
                        handleAttendanceChange(student.registerNumber, e.target.value)
                      }
                    />
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Absent"
                      checked={attendance[student.registerNumber] === 'Absent'}
                      onChange={(e) =>
                        handleAttendanceChange(student.registerNumber, e.target.value)
                      }
                    />
                    Absent
                  </label>
                </div>
              </div>
            </div>
          ))}
          <div className="buttons-section">
            <button onClick={handleUpdate} className="update-button">Update</button>
            <button onClick={handleDownload} className="download-button">Download</button>
          </div>
        </div>
      )}
    </div>
  );
}
