import React from 'react'
import "./Nav.css"
import SignInButton from '../SignInButton/SignInButton'

function Nav() {
  return (
    <nav>
        <img src="../assets/logo.png" alt="logo" />
        <SignInButton />
    </nav>
  )
}

export default Nav
