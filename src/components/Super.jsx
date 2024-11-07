import React, { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom'

const Super = () => {

    const [isAuth,setIsAuth] = useState(false);
    const [loading,setLoading] = useState(true);


    useEffect(()=>{
        const getRouteAccess = async()=>{
            try {
                setLoading(true)
                const response = await fetch("https://authentication-lzrz.onrender.com/user/get/access",{
                    method:'POST',
                    body:JSON.stringify({token:localStorage.getItem('passwordToken')}),
                    headers:{"Content-Type":"application/json"}
                   })
                   const result = await response.json();
            
                   if(!response.ok){
                    
                    throw new Error (result?.message);
                    setLoading(false);
                   }

                   if(result?.status){
                    setLoading(false);
                    setIsAuth(true);
                   }
            } catch (error) {
                setLoading(false);
                toast.error(error.message)
            }
        }
        getRouteAccess();
    },[])
  if(loading){
    return <h2>loading...</h2>
  }
  if(isAuth){
    return <Outlet/>
  }

  else{
    return <Navigate to = "/login"/>;
  }
}

export default Super;