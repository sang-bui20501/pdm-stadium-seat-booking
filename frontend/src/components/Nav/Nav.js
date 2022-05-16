import React, { useContext } from "react";
import { SessionContext } from "hooks/session-context/session-context";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./nav.css";
//ASDAS
function Nav() {
  const { isAuthenticated } = useContext(SessionContext) || {};

  return (
    <nav>
      <div className="logo-div">
        <img src={logo} className="logo-img" alt="logo" />
        <p>Booking App</p>
      </div>
      <div className="sections">
        <Link to="/">Home</Link>
        <Link to="/booking">Start booking</Link>
        <Link to="/your-bookings">Your bookings</Link>

        {/*<Link to={'/proceed-payment'}>Payment</Link>
          <Link to ="/edit-info">Your info</Link>*/}
      </div>
      {isAuthenticated ? 
        <div className="sign-in">
          <Link to="/edit-info">Your info</Link>
        </div> :
        <div className="sign-in">
          <Link to="/sign-in">Sign in</Link>
        </div>
      }
    </nav>
  );
}
// nav
export default Nav;
