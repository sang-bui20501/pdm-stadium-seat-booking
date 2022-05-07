import React from 'react'
import BookingPage from "../BookingPage/BookingPage"
import Nav from '../../components/Nav/Nav'
import "./Homepage.css"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"

function Homepage() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="main">
        <div className="card">
          <h1 className="project-name">Booking App</h1>
          <button className="start-booking-btn">
            <Link to="/booking">Start Booking</Link>
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/booking" exact element={BookingPage}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Homepage
