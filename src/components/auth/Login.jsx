import React, { useState } from 'react';
import './Register.css';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    // Handle login form submission here, for example:
   try{
     const response = await fetch("https://authentication-lzrz.onrender.com/user/login",{
      method:'POST',
      body:JSON.stringify({email,password}),
      headers:{"Content-Type":"application/json"}
     })

     const result = await response.json();
       
     if(!response.ok){
      throw new Error(result?.message)
     }

     if(result?.status){
      toast.success(result?.message);
      localStorage.setItem("accessToken",result?.token);
     }
   } catch (error){
    toast.error(error.message);
   }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-icon">
          <img src="icon-placeholder.png" alt="Icon" />
        </div>
        <h2 className="register-title">Welcome back</h2>
        <p className="register-subtitle">Login to continue</p>
        <form className="register-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your Email"
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
              placeholder="enter your password"
              required
            />
          </div>
          <button type="submit" className="register-button">Login</button>
        </form>
        <div className="login-links">
          <a href="/register" className="link">Create a new account?</a>
          <a href="/password" className="link">Forget password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
