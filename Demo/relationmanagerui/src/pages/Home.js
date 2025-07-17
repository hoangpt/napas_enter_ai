import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the patient data!', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Users</h1>
      <Link to="/add-user" className="btn btn-primary mb-3">Add User</Link>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.firstname}</td>
              <td>{patient.lastname}</td>
              <td>{patient.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
