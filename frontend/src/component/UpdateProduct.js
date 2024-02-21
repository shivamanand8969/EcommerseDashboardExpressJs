import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const cleanedId = id.replace(/[^a-fA-F0-9]/g, '');  // Remove non-hex characters
   const [name,setName]=useState('');
   const [price,setPrice]=useState('');
   const [catergory,setCategory]=useState('');
   const [company,setCompany]=useState('');
   const [data,setData]=useState([]);
  
    useEffect(()=>{
      fetch(`http://127.0.0.1:5000/product/get-product/${cleanedId}`,{
        headers:{
          token:JSON.parse(localStorage.getItem('token'))
        }
      })
      .then((res)=>res.json())
      .then((res)=>{
        setData(res);
        setName(res.name);
        setPrice(res.price);
        setCategory(res.category);
        setCompany(res.company);
      })
    },[])
    
      const handleUpdate=async ()=>{
       let result=await fetch(`http://127.0.0.1:5000/product/get-product/${cleanedId}`,{
        method:'put',
        body:JSON.stringify({name,price,catergory,company}),
        headers:{
          'Content-type':"application/json",
          token:JSON.parse(localStorage.getItem('token'))
        }
       });
        result=await result.json();
        console.log(result)
        navigate('/product')
      }
  return (
    <div>
       <div className='add-product-box'>
          <div className='input-box-add'>
               <h1>Update Product</h1>
               <input type='text' placeholder='Enter product name...' value={name} onChange={(e)=>setName(e.target.value)}/>
               <input type='text' value={price} placeholder='Enter Price...' onChange={(e)=>setPrice(e.target.value)}/>
               <input type='text' value={catergory} placeholder='Enter category...' onChange={(e)=>setCategory(e.target.value)}/>
               <input type='text' value={company} placeholder='Enter company name...' onChange={(e)=>setCompany(e.target.value)}/>
               <button onClick={handleUpdate}>Update Product</button>
          </div>
    </div>
    </div>
  )
}

export default UpdateProduct