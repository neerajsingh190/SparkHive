import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Navbar = () => {
    const [menu,setMenu]= useState("shop")
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
      const fetchUserData = async () => {
        
        const isLoggedInFromStorage = localStorage.getItem('isLoggedIn');
        const userNameFromStorage = localStorage.getItem('firstname');
        setIsLoggedIn(isLoggedInFromStorage);
        setFirstName(userNameFromStorage);
      };
  
      fetchUserData();
    }, []);

  const  handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('firstname');
      localStorage.removeItem('auth-token');
      window.location.replace("/");
    };
    
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>E-shop</p>
      </div>
        <ul className='nav-menu'> 
            <li onClick={()=>{setMenu("shop")}}><Link style= {{textDecoration:'none' ,color:'#626262'}}to= '/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            {/* <li onClick={()=>{setMenu("mens")}}><Link style= {{textDecoration:'none',color:'#626262'}}to = '/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style= {{textDecoration:'none',color:'#626262'}}to = '/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style= {{textDecoration:'none',color:'#626262'}}to = '/kids'>kids</Link>{menu==="kids"?<hr/>:<></>}</li> */}
            <li onClick={()=>{setMenu("search")}}><Link style= {{textDecoration:'none',color:'#626262'}}to = '/search'>search</Link>{menu==="search"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
  {isLoggedIn ? (
    <div className="welcome-logout">
    <p className="welcome-message">Welcome, {firstName}!</p>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <Link style={{ textDecoration: 'none' }} to="/login">
      <button style={{ cursor: 'pointer' }}>Login</button>
    </Link>
  )}


            <Link to = '/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">0</div>
        </div>
        </div>
  )
}

export default Navbar
