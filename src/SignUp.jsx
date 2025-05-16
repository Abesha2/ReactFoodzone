// src/components/RegistrationForm.js
import React from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './store';
import './signin.css'; // ← import the CSS
import { useForm } from 'react-hook-form';

function SignUp() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myFunc = (data) => {
    dispatch(registerUser(data));
    alert("Registration Successfully");
    navigate('/login');
  };



    return (
        <div className="signup-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit(myFunc)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          required
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          required
        />

        <div className="gender-group">
          <span>Gender:</span>
          <label>
            <input type="radio" value="Male" {...register("gender")} /> Male
          </label>
          <label>
            <input type="radio" value="Female" {...register("gender")} /> Female
          </label>
        </div>

        <div className="preference-group">
          <label>Select Preference:</label>
          <select {...register("preference")}>
            <option value="Veg">Veg</option>
             <option value="Non-Veg">Non-Veg</option>
            <option value="Milk">Milk</option>
            <option value="Chocolate">Chocolate</option>
          </select>
        </div>

        <button type="submit">SignUp</button>
      </form>
      <p>
        Already have an account? <a href="/login">Sign In</a>
      </p>
    </div>
  );
}



export default SignUp;