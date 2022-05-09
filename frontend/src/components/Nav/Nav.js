import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import SignIn from 'pages/sign-in/sign-in'
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
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/booking">Start booking</Link>
          </p>
          <p>
            <Link to="/your-bookings">Your bookings</Link>
          </p>
        </div>
        <div className="sign-in">
          <p>
            <Link to="/sign-in">Sign in</Link>
          </p>
        </div>
      </nav>
  )
}

export default Nav
