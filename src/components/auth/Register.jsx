import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from "../ui/Spinner"
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    // Handle form submission here, for example:
     try{
       const response = await fetch("https://authentication-lzrz.onrender.com/user/register",{
        method:"POST",
        body:JSON.stringify({name,email,password}),
        headers:{"Content-Type":"application/json"},
       });
       const result = await response.json();
       if(!response.ok){
        throw new Error(result?.message); //The optional chaining `result?.message` checks if `result.message` exists before accessing it. If it doesn't exist, it returns `undefined`.

       }
       if(result?.status){
        toast.success(result?.message);
        navigate('/login');
       }
     }

     catch (error){
      toast.error(error.message);
     }
    
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-icon">
          <img src="icon-placeholder.png" alt="Icon" />
        </div>
        <h2 className="register-title">Welcome</h2>
        <p className="register-subtitle">Create a new account</p>
        <form className="register-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="create a password"
              required
            />
          </div>
          <button type="submit" className="register-button">Register</button> 
          
        </form>
        <a href="/login" className="back-to-login">← back to login</a>
      </div>
  
    </div>
  );
};

export default Register;
