import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      const response = await fetch("https://authentication-lzrz.onrender.com/user/password/update",{
        method:'POST',
        body:JSON.stringify({password,confirmPassword,token:localStorage.getItem('passwordToken')}),
        headers:{"Content-Type":"application/json"}
       })

       const result = await response.json();

       if(!response.ok){
        throw new Error (result?.message);
       }

       if(result?.status){
       
        toast.success(result?.message);
        navigate('/login');
        localStorage.removeItem('passwordToken')
        localStorage.removeItem('email');
     
       }
     } catch (error) {
      toast.error(error.message);
     }  

  };

  return (
    <div className="password-form-container">
      <div className="password-form-card">
        <div className="password-form-header">
          <span className="password-icon">&#x21bb;</span>
          <h2>New Password</h2>
          <p>Enter at least 6-digit long password</p>
        </div>
        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              placeholder="new password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm password *</label>
            <input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Update Password</button>
        </form>
        <div className="back-link">
          <a href="/login">&#8592; back to login</a>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
