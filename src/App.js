import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
 
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

import Login from './Login/Login';
import LoginLama from './LoginLama/LoginLama';
import Dashboard from './Dashboard/Dashboard';
import Home from './Home/Home';

import ListPegawai from './Pegawai/ListPegawai'; 
import BuatPegawai from './Pegawai/BuatPegawai';
import UpdatePegawai from './Pegawai/UpdatePegawai';
 
function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const username = sessionStorage.getItem("username");
 
  if (username) {
    console.log("Ada Session");
  } else {
    console.log("Tidak Ada Session");
  }

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
 
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
                  
            {username ? (
              <>
                <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
                <NavLink activeClassName="active" to="/pegawai">ListPegawai</NavLink>
              </>
            ) : (
              <>
                <NavLink activeClassName="active" to="/login">Login</NavLink>
              </>
            )}



            {/* <NavLink exact activeClassName="active" to="/">Home</NavLink> */}
            {/* <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink> */}
            {/* <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/loginLama">Login Lama</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small> */}
          </div>
          <div className="content">
            <Routes>
               
            {username ? (
              <>
                <Route path="/dashboard" element={<Dashboard/>}/>

                <Route path="/pegawai" element={<ListPegawai/>}/>
                <Route path="/buatPegawai" element={<BuatPegawai/>}/>
                <Route path="/updatePegawai/:id" element={<UpdatePegawai/>}/>
              </>
            ) : (
              <>
                <Route path="/login" element={<Login/>}/>
              </>
            )}





              {/* <Route exact path="/" element={<Home/>}/> */}
              {/* <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/login" element={<Login/>}/> */}
              {/* <Route path="/login" element={<Login/>}/>
              <Route path="/loginLama" element={<LoginLama/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/> */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>

    </div>
  );
}
 
export default App;