import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Product from './component/Product';
import AddProduct from './component/AddProduct';
import UpdateProduct from './component/UpdateProduct';
import Logout from './component/Logout';
import Profile from './component/Profile';
import SignUp from './component/SignUp';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';

const router=createBrowserRouter([
  {
    path:'/', 
    element:<App/>,
    children:[
      {
        path:'product',
        element:<Product/>
      },
      {
        element:<PrivateComponent/>,
        children:[
          {
            path:"add-product",
            element:<AddProduct/>
          },
          {
            path:'update-product/:id',
            element:<UpdateProduct/>
          },
          {
            path:'Logout',
            element:<Logout/>
          },
          {
            path:'profile',
            element:<Profile/>
          },
        ]
      },
      {
        path:'signup',
        element:<SignUp/>
      },
      {
        path:'login',
        element:<Login/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
