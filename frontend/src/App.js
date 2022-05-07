import logo from './logo.svg';
import './App.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='header'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/signup'>Sign Up</NavLink>
          <NavLink to='/signin'>Sign In</NavLink>
          <NavLink to='/book'>Book your seats</NavLink>
        </div>

        <div className='content'>
          <Routes>
            <Route path='/' />
            <Route path='/signup' />
            <Route path='/signin' />
            <Route path='/book' />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
