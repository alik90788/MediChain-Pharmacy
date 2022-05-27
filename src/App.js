// import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import Login from './Screens/Login/Login';
import { useSelector } from 'react-redux';
import { login, selectUser } from './features/userSlice'
import Logout from './Screens/Logout/Logout'
// import App2 from './App2'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Nav/Home'
import Dashboard from './Screens/Dashboard/Dashboard';
import Sell from './Screens/Med_Form/Med_Form'
import Registration from './Screens/Registration/Registration'
import Products from './Screens/Products/Products';
import ProtectedRoute from './Components/common/ProtectedRoute';
import {getCurrentUser} from './apis/authentication';
import Production from './Screens/Production/Production';
import { Buy_Med } from './Screens/Buy_Med/Buy_Med';
function App() {

  const [user, setUser] = useState(null)
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    // const authToken = localStorage.getItem('authToken');
    // if (authToken) {
    //   getCurrentUser(authToken)
    //     .then(res => res.json())
    //     .then(user => {
    //       console.log(user, "user");
    //       localStorage.setItem("user",JSON.stringify(user))
    //     }).catch(e => console.log(e, "err"));
    // }
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  useEffect(() => {
    if(user){
      setLoggedin(true);
    }
  }, [user]);
  return (
    <div className="App">
      {/* <Router> */}

      <Router>
        {loggedin && <Navbar />}
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
          />
          <Route
          path="/sell"
          element={
              <Sell />
          }
          />
          <Route
          path="/products"
          element={
            <Products />
          }
          />
          <Route
          path="/production"
          element={
            <Production />
          }
          />
          <Route
          path="/buy_med"
          element={
            <Buy_Med />
          }
          />
          {/* <ProtectedRoute path='/dashboard' element={<Dashboard />} />
          <ProtectedRoute path='/sell' element={<Sell />} />
          <ProtectedRoute path='/products' element={<Products />} /> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
