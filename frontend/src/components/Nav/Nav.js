import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import logo from "../../assets/logo.png"
import "./Nav.css"

function Nav() {
  return (
      <nav>
        <div className="logo-div">
          <img src={logo} alt="logo"/>
          <p>Booking App</p>
        </div>
        <div className="sections">
          <Link to="/">Home</Link>
          <Link to="/booking">Start booking</Link>
          <Link to="/your-bookings">Your bookings</Link>
          {/*<Link to={'/proceed-payment'}>Payment</Link>*/}
        </div>
        <div className="sign-in">
          <Link to="/sign-in">Sign in</Link>
        </div>
      </nav>
  )
}

export default Nav
