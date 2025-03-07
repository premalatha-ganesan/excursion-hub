import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Register from './components/Authentication/Register'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home'
import Browse from './components/Browse'
import Contact from './components/Contact'
import Locations from './components/Locations'
import Settings from './components/Profile/Settings'
import Profile from './components/Profile/Profile'
import Login from './components/Authentication/Login'
import MyWishList from './components/Profile/MyWishList.jsx'
import CityPage from './components/CityPage'
import PasswordReset from './components/Authentication/PasswordReset'
import ForgotPassword from './components/Authentication/ForgotPassword'
import AttractionPage from './components/AttractionPage'
import Packages from './components/Packages/Packages.jsx'
import PackageDetails from './components/Packages/PackageDetails.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const [user, setUser] = useState("");
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("user");
    if (storedData) {
      setSessionData(JSON.parse(storedData));
      setUser(JSON.parse(storedData));
    }
    
  }, []);

  const refreshUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/userservices/getUser", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("Fetched current user:", userData);
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
      } else {
        console.error("Failed to find user.");
        setUser();
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      setUser();
    }
  };

  const logoutUser = async (e) => {
    try {
      const response = await fetch("http://localhost:8080/userservices/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser("");
        sessionStorage.removeItem("user")
        console.log("Logout successful")
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const theme = createTheme({
    palette: {
        background: {
            default: '#C2948A',
            },
        primary: {
        light: '#f6f0ed',
        main: '#C2948A',
        dark: '#223843',
        contrastText: '#f6f0ed'
      },
      secondary: {
        light: '#223843',
        main: '#bbb193',
        dark: '#c2948a',
        contrastText: '#jjj',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar user={user}
          logoutUser={logoutUser} />
          
        <br />
        <br />
        <Routes>
          <Route
            path='/'
            element={<Home
              user={user}
            />}
          />
          <Route
            path='/locations'
            element={<Locations
              user={user} />}
          />
          <Route
            path='/locations/:cityId'
            element={<CityPage
              user={user} />}
          />
          <Route
            path='/packages'
            element={<Packages
              user={user} 
             />}
          />
          <Route
            path='/packages/managePackages/:packageId'
            element={<PackageDetails
              user={user} />}
          />
          <Route
            path='/packages/managePackages'
            element={<PackageDetails
              user={user} />}
          />
          <Route
            path='/attractions/:attractionId'
            element={<AttractionPage
              user={user} />}
          />
          <Route
            path='/browse'
            element={<Browse
              user={user}
            />}
          />
          <Route
            path='/contact'
            element={<Contact
              user={user} />}
          />
          <Route
            path='/register'
            element={<Register />}
          />
          <Route
            path='/profile'
            element={<Profile
              user={user}
              refreshUser={refreshUser} />}
          />
          <Route
            path='/settings'
            element={<Settings
              user={user}
              refreshUser={refreshUser} />}
          />
          <Route
            path='/wishlist'
            element={<MyWishList
              user={user}
            />}
          />
          <Route
            path='/login'
            element={<Login
              refreshUser={refreshUser} />}
          />
          <Route
            path='forgotpassword'
            element={<ForgotPassword />}
          />
          <Route
            path='resetpassword'
            element={<PasswordReset />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
