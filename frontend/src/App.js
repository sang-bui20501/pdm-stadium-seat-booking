import logo from './logo.svg';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import SignUp from 'pages/sign-up';
import Home from 'pages/homepage';
import SignIn from 'pages/sign-in';
import ShowBookings from 'pages/show-booking';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid justify-content-center'>
            <div className='px-3'> <NavLink to='/'>Home</NavLink> </div>
            <div className='px-3'> <NavLink to='/signup'>Sign Up</NavLink> </div>
            <div className='px-3'> <NavLink to='/signin'>Sign In</NavLink> </div>
            <div className='px-3'> <NavLink to='/book'>Book your seats</NavLink> </div>
          </div>
        </div>

        <div className='d-flex justify-content-center mt-5'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/book-seats' />
            <Route path='/your-bookings' element={<ShowBookings/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
