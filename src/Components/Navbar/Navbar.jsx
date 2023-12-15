import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContext'

export default function Navbar({userData,logOut}) {
   let{numOfCartItems}=useContext(cartContext);



  return <>
    <nav className="navbar navbar-expand-lg  fixed-top bg-light  ">
      <div className="container">
        <Link className="navbar-brand bg-white" to="/"><img src={logo} alt="" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {userData?   <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products">Products</Link>
            </li>
          

          </ul>:''}


          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className='mx-2'>
              <i className='fa-brands fa-facebook '></i>
            </li>
            <li className='mx-2'>
              <i className='fa-brands fa-twitter '></i>
            </li>
            <li className='mx-2'>
              <i className='fa-brands fa-instagram '></i>
            </li>
          </ul>


          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userData?<>
              <li className="nav-item position-relative">
              <Link className="nav-link" to="cart"><i className='fas fa-shopping-cart fa-lg'></i> <span className='badge bg-main position-absolute top-0 end-0 '> {numOfCartItems}</span></Link>
            </li>  
            <li className="nav-item">
              <span className="nav-link" onClick={logOut}>logout</span>
            </li>
           
            </> :<>      <li className="nav-item">
              <Link className="nav-link" to="login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="register">Register</Link>
            </li></>}

          </ul>


        </div>
      </div>
    </nav>

  </>
}
