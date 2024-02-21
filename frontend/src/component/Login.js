import React, { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
     useEffect(()=>{
      let isAuth=localStorage.getItem('user');
      if(isAuth){
         navigate('/');
      }
     },[])
    const handleLogin=async ()=>{
      let result=await fetch('http://127.0.0.1:5000/signup//login',{
        method:"POST",
        body:JSON.stringify({email,password}),
        headers:{
          'Content-type':"application/json",
        }
      })
      result=await result.json();
      console.log(result?.token)
      if(result.user){
        localStorage.setItem('user',JSON.stringify(result.user));
        localStorage.setItem('token',JSON.stringify(result.token));
        navigate('/')
      }
      console.log(result)
    }
  return (
    <div className='singupbox'>
        <div className='login-box'>
        <h1>Login form</h1>
         <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter email...'/>
         <input type='text' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter password...'/>
    <button onClick={handleLogin}>Login</button>
    </div>
        </div>
  )
}

export default Login