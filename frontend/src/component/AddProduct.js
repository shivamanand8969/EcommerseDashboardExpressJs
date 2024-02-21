import React, { useState } from 'react'
import './AddProduct.css'
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {

    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const [err,setError]=useState(false);
    const navigate=useNavigate();
  
     let handleAddProduct=async ()=>{
         if(!name || !price || !category || !company){
            setError(true);
           return false;
         }
          const id=JSON.parse(localStorage.getItem('user'))._id;
          let result=await fetch('http://127.0.0.1:5000/product/add-product',{
            method:"post",
            headers:{
              'Content-Type':"application/json",
              token:JSON.parse(localStorage.getItem('token'))
            },
            body:JSON.stringify({name,price,category,company,userId:id})
          })
        result=await result.json();
        navigate('/product')
     }
  return (
    <div className='add-product-box'>
          <div className='input-box-add'>
               <h1>Add Product</h1>
               <input type='text' placeholder='Enter product name...' value={name} onChange={(e)=>setName(e.target.value)}/>
                {err && !name && <span className='errmsg'>Please Enter the valid name</span>}
               <input type='text' value={price} placeholder='Enter Price...' onChange={(e)=>setPrice(e.target.value)}/>
               {err && !price && <span className='errmsg'>Please Enter the valid Price</span>}
               <input type='text' value={category} placeholder='Enter category...' onChange={(e)=>setCategory(e.target.value)}/>
               {err && !category && <span className='errmsg'>Please Enter the Catefory</span>}
               <input type='text' value={company} placeholder='Enter company name...' onChange={(e)=>setCompany(e.target.value)}/>
               {err && !company && <span className='errmsg'>Please Enter the valid company</span>}
               <button onClick={handleAddProduct}>Add Product</button>
          </div>
    </div>
  )
}

export default AddProduct