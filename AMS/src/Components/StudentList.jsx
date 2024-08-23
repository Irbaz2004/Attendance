import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3001/getUsers')
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching users: ', error));
    }, []);

  return (
    <div className="student-list-container">
      <h1>Student List</h1>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Register Number</th>
            <th>Year of Studying</th>
            <th>Branch of Studying</th>
            <th>Gender</th>
            <th>Attendance</th>

          </tr>
        </thead>
        <tbody>
          {users.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.registerNumber}</td>
              <td>{student.yearOfStudying}</td>
              <td>{student.branchOfStudying}</td>
              <td>{student.gender}</td>
              <td>{student.attendance}</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
