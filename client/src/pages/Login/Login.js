import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
const Login = ({ handleLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("https://reqres.in/api/login", userData)
      .then((response) => {
        console.log(response);
        handleLogin(true);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
          alert("wrong");
        }
      });
  };
  return (
    <body>
      <div class="wrapper">
        <div id="left">
          <div class="sign-in">
            <form action="#">
              <div>
                <label for="">Email or Usename</label>
                <input
                  type="text"
                  class="text-input"
                  value={data.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
              <div>
                <label for="">Password</label>
                <input
                  type="password"
                  class="text-input"
                  value={data.password}
                  onChange={handleChange}
                  name="password"
                />
              </div>
              <button onClick={handleSubmit} type="submit" class="btnn">
                Sign In
              </button>
            </form>
          </div>
        </div>
        <div id="right">
          <div class="showcase">
            <img src="bgLogin.jpg" alt="" />
          </div>
        </div>
      </div>
    </body>
  );
};

export default Login;
