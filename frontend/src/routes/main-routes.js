import React from 'react'
import BookingPage from '../pages/booking-page/booking-page'
import SignIn from '../pages/sign-in/sign-in'
import SignUp from '../pages/sign-up/sign-up'
import Homepage from '../pages/homepage/homepage'
import ShowBookings from '../pages/show-bookings/show-bookings'
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import { getToken } from "utils/common"

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
