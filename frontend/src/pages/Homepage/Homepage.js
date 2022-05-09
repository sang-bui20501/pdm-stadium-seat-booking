import React, { useState, useEffect } from 'react'
import Nav from 'components/Nav/Nav'
import "./Homepage.css"
import {Link} from "react-router-dom"
import axios from 'axios'
import { getToken } from "Utils/Common"

function Homepage() {
  return (
    <div>
        <Nav />
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
