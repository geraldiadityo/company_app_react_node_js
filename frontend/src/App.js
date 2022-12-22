import React, {useState, useEffect} from 'react';
import { Routes,Route,Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from './service/auth.service';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import MainJabatan from './components/jabatan/MainJabatan';
import MainEmployee from './components/employee/MainEmployee';
const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user){
      setCurrentUser(user);
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  },[]);

  const logOut = () => {
    AuthService.logOut();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Test
          </Link>
          <div className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {showAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to={"/employee"}>
                  Employee
                </Link>
              </li>
            )}
            {showAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to={"/jabatan"}>
                  Jabatan
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav mb-auto">
              <li className="nav-item">
                <a href="/login" onClick={logOut} className="nav-link">
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav mb-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path='/' element={currentUser !== undefined ? <Home/> : <Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/jabatan' element={<MainJabatan/>}/>
          <Route path='/employee' element={<MainEmployee/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default App;
