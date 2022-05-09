import React from 'react'
import BookingPage from '../pages/booking-page/booking-page'
import SignIn from '../pages/sign-in/sign-in'
import SignUp from '../pages/sign-up/sign-up'
import Homepage from '../pages/Homepage/Homepage'
import ShowBookings from '../pages/show-bookings/show-bookings'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { getToken } from "Utils/Common"
import PrivateRoute from './private-route';
import Nav from 'components/Nav/Nav'

function MainRoutes() {

  function requireAuth(nextState, replace) {
    if (!getToken()) {
      replace("/sign-in");
    }
  }

  return (
    <BrowserRouter>
      <div> <Nav></Nav> </div>
      <div>
        <Routes>
          <Route path="/" exact element={<PrivateRoute Component={Homepage} />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/booking" exact element={<PrivateRoute Component={BookingPage} />} />
          <Route path='/your-bookings' exact element={<PrivateRoute Component={ShowBookings} />} onEnter={requireAuth} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default MainRoutes
