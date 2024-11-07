import React, { useEffect, useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';
import toast from 'react-hot-toast';
const VerifyOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(null);
  const [isexpire, setIsExpire] = useState(false);
 const navigate = useNavigate();
  // Handle input changes for each OTP input box
  const handleOtpChange = (value, index) => {
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input box when a digit is entered
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const submitHandler = async(event) => {
    event.preventDefault();

     try {
      const otpString = otp.join('');
      const response = await fetch("https://authentication-lzrz.onrender.com/user/otp/verify",{
        method:'POST',
        body:JSON.stringify({otp:otpString}),
        headers:{"Content-Type":"application/json"}
       })
       const result = await response.json();

       if(!response.ok){
        throw new Error (result?.message);
       }

       if(result?.status){
       
        toast.success(result?.message);
      //  localStorage.setItem('passwordToken',result?.token)
       navigate("/update/password");
       }

     } catch (error) {
      toast.error(error.message);
     }
  };
     
      useEffect(()=>{
        const getTime = async()=>{
          try {
            
            const response = await fetch("https://authentication-lzrz.onrender.com/user/otp/time",{
        method:'POST',
        body:JSON.stringify({token:localStorage.getItem('passwordToken')}),
        headers:{"Content-Type":"application/json"}
       })
       const result = await response.json();

       if(!response.ok){
        throw new Error (result?.message);
       }

       if(result?.status){
        const remaningTime = new Date(result?.sendTime).getTime()- new Date().getTime();
        if(remaningTime > 0){  
          setOtpTimer(remaningTime);
        }
       else{
         setIsExpire(true);
       }
        
       }
        // toast.success(result?.message);
          } catch (error) {
            toast.error(error.message)
          }
        };
        getTime();
      },[]);

      const resendHander = async ()=>{
          try {
            const response = await fetch("https://authentication-lzrz.onrender.com/user/forget/password",{
              method:'POST',
              body:JSON.stringify({email:localStorage.getItem('email')}),
              headers:{"Content-Type":"application/json"}
             })
    
             const result = await response.json();
    
             if(!response.ok){
              throw new Error (result?.message);
             }
    
             if(result?.status){
              
              toast.success(result?.message);
             localStorage.setItem('passwordToken',result?.token)
             setOtpTimer(1 * 60 * 1000);
             setIsExpire(false);
             }
          } catch (error) {
            toast.error(error.message);
          }
      }
  

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-icon">
          <img src="icon-placeholder.png" alt="Icon" />
        </div>
        <h2 className="register-title">Verify your OTP</h2>
        <p className="register-subtitle">
          Enter 6-digit OTP here we just sent at your email
        </p>
        <form className="register-form" onSubmit={submitHandler}>
          <div className="otp-input-group">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="number"
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                className="otp-input"
                required
                onInput={(event)=>{
                  if(event.target.value.length>1){
                    event.target.value=event.target.value.slice(0,1);
                  }
                }}
              />
            ))}
          </div>
          <button type="submit" className="register-button">Verify</button>
        </form>
        <div className="timer">
         { otpTimer !== null && ! isexpire ? (  <Timer setIsExpire = {setIsExpire} time ={otpTimer}/>) :(
          <span onClick={resendHander} className='otp_resend'>Resend</span>
         ) }
        </div>
        <a href="/login" className="back-to-login">← back to login</a>
      </div>
    </div>
  );
};

export default VerifyOtp;
