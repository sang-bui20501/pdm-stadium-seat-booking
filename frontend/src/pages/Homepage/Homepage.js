import React, { useState, useEffect } from 'react'
import "./Homepage.css"
import {Link} from "react-router-dom"

function Homepage() {
  return (
    <div>
        <div className="main">
            <div className="card">
            <h1 className="project-name">Booking App</h1>

            <button className="start-booking-btn">
                <Link to={"/booking"}>Start Booking</Link>
            </button>
            </div>
        </div>
    </div>
  )
}

export default Homepage
