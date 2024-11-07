import React from "react";
import {Routes,Route} from 'react-router-dom';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Password from "./components/auth/Password";
import VerifyOtp from "./components/auth/VerifyOtp";
import UpdatePassword from "./components/auth/UpdatePassword";
import Super from "./components/Super";
function App() {
  return (
    <Routes>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/password" element={<Password/>} />
   <Route element={<Super/>}>
   <Route path="/otp/verify" element={<VerifyOtp/>} />
   <Route path="/update/password" element={<UpdatePassword/>}/>
   </Route>
    </Routes>
  
  )
}

export default App;
