import React from 'react'
import BookingPage from '../pages/BookingPage/BookingPage'
import SignIn from '../pages/SignIn/SignIn'
import SignUp from '../pages/SignUp/SignUp'
import Homepage from '../pages/Homepage/Homepage'
import ShowBookings from '../pages/ShowBookings/ShowBookings'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import { getToken } from "../utils/Common"

function MainRoutes() {
  
  function requireAuth(nextState, replace) {
    if (!getToken()) {
      replace("/sign-in");
    }
  }

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Homepage/>}/>
          <Route path="/sign-in" exact element={<SignIn/>}/>
          <Route path="/sign-up" exact element={<SignUp/>}/>
          <Route path="/booking" exact element={<BookingPage/>} />
          <Route path='/your-bookings' exact element={<ShowBookings/>} onEnter={requireAuth}/>
      </Routes>
    </BrowserRouter>
  )
}

export default MainRoutes
