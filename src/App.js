import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import LoadingIndicator from './components/LoadingIndicator';
import HomePage from './pages/HomePage';
import { Route } from 'react-router-dom';
import UserProfilePage from './pages/UserProfilePage';
import NavBar from './components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import MyProfilePage from './pages/MyProfilePage';
import UploadPage from './pages/UploadPage';

const App = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    axios.get('https://insta.nextacademy.com/api/v1/users')
      .then(result => {
        setUsers(result.data)
        setIsLoading(false)
      })
    let loggedInUser = localStorage.getItem("userInfo");
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
    }
  }, [])

  const signUpUser = (username, email, password, callback) => {
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/users/",
      data: {
        username: username,
        email: email,
        password: password
      }
    })
      .then(result => {
        if (result.data.status === "success") {
          toast.success("Registered account!", toastSettings);
          callback();
        } else {
          toast.warning("Oops, something went wrong!", toastSettings);
        }
      })
      .catch(err => {
        let delay = 500;
        err.response.data.message.forEach(message => {
          setTimeout(() => {
            toast.error(message, toastSettings);
          }, delay);
          delay += 500;
        });
      });
  };

  const loginUser = (username, password, callback) => {
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: {
        username: username,
        password: password
      }
    })
      .then(response => {
        if (response.status === 201) {
          toast.success(
            `Welcome back ${response.data.user.username}`,
            toastSettings
          );
          localStorage.setItem("authToken", response.data.auth_token);
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
          setCurrentUser(response.data.user);
          callback();
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          toast.error(
            "Invalid credentials, check and try again.",
            toastSettings
          );
        }
      });
  };

  const logoutUser = () => {
    toast.success("Successfully logged out, come back soon");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setCurrentUser(null);
  };
  if (isLoading)
    return <LoadingIndicator />

  return (
    <>
      <NavBar
        signUpUser={signUpUser}
        loginUser={loginUser}
        logoutUser={logoutUser}
        currentUser={currentUser}>
      </NavBar>

      <ToastContainer />

      <Route exact path="/" render={() => <HomePage users={users} isAuthed={true} />} />
      <Route path="/users/:userId/:username/:profileImage" render={() => <UserProfilePage users={users} isAuthed={true} />} />
      <Route path="/profile"><MyProfilePage /></Route>
      <Route path="/image/upload"><UploadPage /></Route>
    </>
  );
}

const toastSettings = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

export default App;