import React, { useState, useEffect } from 'react'
import styles from "./homepage.module.css"
import {Link} from "react-router-dom"

function Homepage() {
  return (
    <div>
        <div className={styles.main}>
            <div className={styles.card}>
            <h1 className={styles["project-name"]}>Booking App</h1>

            <button className={styles["start-booking-btn"]}>
                <Link to={"/booking"}>Start Booking</Link>
            </button>
            </div>
        </div>
    </div>
  )
}

export default Homepage
