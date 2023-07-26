import React, { useState } from 'react';
import axios from 'axios';
import { getUsername, logout ,getUser, removeUserSession } from '../Utils/Common';
 
function Dashboard(props) {
  // const user = getUser();
 
  // handle click event of logout button
  const [loading, setLoading] = useState(false);
  const username = getUsername();
  const [error, setError] = useState(null);
  const headers = {
    headers: { Authorization: 'Bearer 4pb4tech' }
  };
  const ip = 'http://localhost:8080';
  const url = ip + '/logout';
  const handleLogout = () => {
    setError(null);
    setLoading(true);
    logout();
    window.location.href = "/login";
    // axios.post(url, { username: sessionStorage.getItem('username') }, headers).then(response => {
    //   logout();
    //   window.location.href = "/login";
    // }).catch(error => {
    //   setLoading(false);
    //   if (error.response.status === 401) setError(error.response.data.message);
    //   else setError("Something went wrong. Please try again later.");
    // });
    // removeUserSession();
    // props.history.push('/login');
  }

  const checkSession = () => {
    var pengguna = sessionStorage.getItem("pengguna");
    var name = sessionStorage.getItem("name");
    var username = sessionStorage.getItem("username");
    var email = sessionStorage.getItem("email");
    var token = sessionStorage.getItem("token");
    var token_expired = sessionStorage.getItem("token_expired");
    console.log(pengguna);
    console.log(name);
    console.log(username);
    console.log(email);
    console.log(token);
    console.log(token_expired);
    
  }
 
  return (
    <div>
      Welcome {username}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" /><br /><br />
      Check Session<br /><br />
      <input type="button" onClick={checkSession} value="Check Session" />
    </div>
  );
}
 
export default Dashboard;