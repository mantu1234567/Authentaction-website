import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Password = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();

      try {
        const response = await fetch("https://authentication-lzrz.onrender.com/user/forget/password",{
          method:'POST',
          body:JSON.stringify({email}),
          headers:{"Content-Type":"application/json"}
         })

         const result = await response.json();

         if(!response.ok){
          throw new Error (result?.message);
         }

         if(result?.status){
          toast.success(result?.message);
         localStorage.setItem('passwordToken',result?.token)
         localStorage.setItem('email',email);
         navigate("/otp/verify");
         }
      } catch (error) {
        toast.error(error.message)
      }
   
    
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-icon">
          <img src="icon-placeholder.png" alt="Icon" />
        </div>
        <h2 className="register-title">Forget your password</h2>
        <p className="register-subtitle">
          Enter your registered email, we will send a 6-digit OTP
        </p>
        <form className="register-form" onSubmit={submitHandler}>
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
          <button type="submit" className="register-button">Send OTP</button>
        </form>
        <a href="/login" className="back-to-login">← back to login</a>
      </div>
    </div>
  );
};

export default Password;
