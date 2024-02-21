import React, { useEffect, useState } from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
     const navigate=useNavigate();
    useEffect(()=>{
        const user1=localStorage.getItem("user")
        if(user1){
            navigate('/')
        }
    },[])
      const [name,setName]=useState('');
      const [email,setEmail]=useState('');
      const [password,setPassword]=useState('');
      const handleSignup= async ()=>{
        let result=await fetch('http://127.0.0.1:5000/signup/register',{
            method:"POST",
            body:JSON.stringify({name,email,password}),
            headers:{
                "Content-type":"application/json",
            }
        })    
        result=await result.json();
        console.log(result)
        
        localStorage.setItem('user',JSON.stringify(result.savedata));
        localStorage.setItem('token',JSON.stringify(result.token));
            navigate('/product')
      }

  return (
    <div className='singupbox'>
          <h1>Register</h1>
         <input type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter  Name...'/> 
         <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email....'/> 
         <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password...'/> 
         <button onClick={handleSignup} type='submit'>SignUp</button>
    </div>
  )
}

export default SignUp