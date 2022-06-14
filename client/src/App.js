import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Task from "./pages/Task/Task";
import Profile from "./pages/Profile/Profile";
import TopBar from "./components/topbar/Topbar";
export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login handleLogin={setLoggedIn} />
      ) : (
        <Dashboard handleLogin={setLoggedIn} />
      )}
    </div>
  );
}

const Dashboard = ({ handleLogin }) => {
  return (
    <>
      <Router>
        <TopBar handleLogin={handleLogin} />
        <div className="container-dash">
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:id">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/task">
              <Task />
            </Route>
            <Route path="/Profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};
