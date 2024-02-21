import React, { useEffect, useState } from 'react'
import './Product.css'
import { Link, useNavigate } from 'react-router-dom';
const Product = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchfield, setSearchField] = useState('')
  useEffect(() => {
    console.log("Token", localStorage.getItem('token'))
    getData();
  }, [])
  const getData = async () => {
    let result = await fetch('http://127.0.0.1:5000/product/get-product', {
      headers: {
        token: JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json();
    setData(result);
    console.log(result)
  }
  const handleDelete = async (id) => {
    console.log(id);
    const deleteData = await fetch(`http://127.0.0.1:5000/product/delete-product/${id}`, {
      method: 'delete',
      headers: {
        token: JSON.parse(localStorage.getItem('token'))
      }
    });
    console.log(deleteData.message);
    getData();
    navigate('/product');
  }
  const handleSearch = async (e) => {
    setSearchField(e.target.value);
    if (e.target.value) {
      let result = await fetch(`http://127.0.0.1:5000/product/search/${e.target.value}`, {
        headers: {
          token: JSON.parse(localStorage.getItem('token'))
        }
      }
      )
      result = await result.json();
      setData(result)
    }
    else {
      let result = await fetch('http://127.0.0.1:5000/product/get-product', {
        headers: {
          token: JSON.parse(localStorage.getItem('token'))
        }
      }
      );
      result = await result.json();
      setData(result);
    }

  }
  return (

    <>
    <div className='mindivheight'>
      <div className='productlistdiv'>
        <input type='text' placeholder='serach something...' onChange={handleSearch} value={searchfield} />
      </div>
      <table>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name </th>
            <th>Price</th>
            <th>Catergory</th>
            <th>Company</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {

            data.map((value, index) => (

              
              <tr key={value.name}>
                <td>{index + 1} </td>
                <td>{value.name}</td>
                <td>{value.price}</td>
                <td>{value.category}</td>
                <td>{value.company}</td>
                <td>
                  <button className='deleteb' onClick={()=>handleDelete(value._id)}>Delete</button>
                  <Link to={`/update-product/${value._id}:`} className='updatebtn'>Update</Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
    </>

  )
}

export default Product