import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddUser() {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    age: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.username) formErrors.username = 'Username is required';
    if (!formData.firstname) formErrors.firstname = 'First name is required';
    if (!formData.lastname) formErrors.lastname = 'Last name is required';
    if (!formData.age) formErrors.age = 'Age is required';
    else if (isNaN(formData.age)) formErrors.age = 'Age must be a number';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log('Form data:', formData);
      // Submit form data
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="text-danger">{errors.username}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
          {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <div className="text-danger">{errors.age}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
export default AddUser;
