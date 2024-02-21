import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {
    const user1=localStorage.getItem("user")
  return (
    <div>
        {
            user1 ?  <Outlet/> :<Navigate to={'/signup'}/> 
        }       
    </div>
  )
}

export default PrivateComponent