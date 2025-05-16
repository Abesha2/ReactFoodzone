import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import './header.css';
import { FiUser } from "react-icons/fi";
import NonVeg from './NonVeg';
import Veg from './Veg';
import Home from './Home';
import Cart from './Cart';
import Chinese from './Chinese';

import Snacks from './Snacks';
import Pizza from './Pizza';
import ContactUs from './ContactUs';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './SignUp';
import Orders from './Orders';
import PageNotFound from './PageNotFound';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { logoutUser } from './store'; // Make sure to import logoutUser action
import Deserts from './Deserts';
import Italian from './Indian';

function App() {
  const cartObjects = useSelector((globalState) => globalState.cart);
  const cartCount = cartObjects.reduce((total, item) => total + item.quantity, 0);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <header className="main-header">
        <div className="top-bar">
          <div className="logo-section">
            <span className="logo-icon">🍴</span>
            <span className="logo-name">FoodZone</span>
            <span className="tagline">Delicious Delivered</span>
          </div>
          <div className="top-right-icons">
            
            {isAuthenticated ? (
              <>
                <span>Welcome, {currentUser.username}</span>
                <button onClick={() => dispatch(logoutUser())}>LogOut</button>
              </>
            ) : (
              <Link to="/SignUp" className="sign-in-link">
                <FiUser size={20} style={{ marginRight: "5px" }} className="sign-in-icon" />
                Sign up
              </Link>
            )}
          </div>
        </div>

        <nav className="bottom-nav">
          <Link to="/home">🏠 Home</Link>
          <Link to="/nonveg">🍗 NonVeg</Link>
          <Link to="/veg">🥦 Veg</Link>
          <Link to="/chinese">🥡 Chinese</Link>
          <Link to="/desserts">🍰 Desserts</Link>
          <Link to="/snacks">🍟 Snacks</Link>
          <Link to="/pizza">🍕 Pizza</Link>
          <Link to="/cart">🛒 Cart<span className="icon"> <span className="cart-count">{cartCount}</span></span></Link>
          <Link to="/orders">Orders</Link>
          <Link to="/contactus">📞 Contact</Link>
        </nav>
      </header>

      <div className="body-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/chinese" element={<Chinese />} />
          <Route path="/desserts" element={<Deserts/>} />
          <Route path="/snacks" element={<Snacks />} />
          <Route path="/pizza" element={<Pizza />} />
          <Route path="/" element={<Pizza />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/italian' element={<Italian/>}/>
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
