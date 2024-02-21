import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Nav.css'
const Nav = () => {
    const user1=localStorage.getItem('user');
    // const showmoreitem    result: "No User found"
     const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate('/signup')
    }
  return (
    <div className='nav'>
        <ul className='nav2'>
          {user1 && <>
          
            <li><Link id='productlink' to={'/product'}>Product</Link></li>
            <li><Link to={'/add-product'}>Add Product</Link></li>
            {/* <li><Link to={'/update-product'}>Update Product</Link></li> */}
            
            <li><Link to={'/profile'}>Profile</Link></li></>}
            <li>{user1 ?<button onClick={logout} className='logoutbtn'>Logout</button> :<Link to={'/signup'}>Signup</Link>}</li>
           {user1 ?null : <li><Link to={'/login'}>Login</Link></li>}
        </ul>
    </div>
  )
}

export default Nav