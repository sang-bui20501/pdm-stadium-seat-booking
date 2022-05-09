import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import logo from "../../assets/logo.png"
import "./Nav.css"

function Nav() {
  return (
      <div className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <div className="navbar-brand">
            <img src={logo} alt="logo"/>
            <small>Booking App</small>
          </div>
          <div className='d-flex'>
            <div className='nav-item mx-3'> <Link to="/">Home</Link> </div>
            <div className='nav-item mx-3'> <Link to="/booking">Start booking</Link> </div>
            <div className='nav-item mx-3'> <Link to="/your-bookings">Your bookings</Link> </div>
            <div className='nav-item mx-3'> <Link to="/sign-in">Sign in</Link> </div>
            <div className='nav-item mx-3'> <Link to={'/proceed-payment'}>Payment</Link> </div>
          </div>
          
        </div>
      </div>
  )
}

export default Nav
