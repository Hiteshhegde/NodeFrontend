import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./login.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Login({ history }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/home");
    }
  }, [history]);
  const SubmissionHandler = (e) => {
    e.preventDefault();

    setUser({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    // console.log("To send", user);
    axios
      .post("http://localhost:9000/auth/login", user)
      .then((res) => {
        // console.log("Here is the token", res.data.token);
        if (!localStorage.getItem("authToken")) {
          localStorage.setItem("authToken", res.data.token);
        }
        history.push("/add-form");
      })
      .catch((err) => console.log("HERE IS THE ERROR", err.response.data));
  };
  return (
    <div>
      <form onSubmit={SubmissionHandler}>
        {/* <label htmlFor="name">Username:</label>
        <input
          type="text"
          required
          id="name"
          name="name"
          placeholder="Enter Username"
        /> */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          required
          id="email"
          name="email"
          placeholder="Enter a valid Email Id"
        />
        <input
          type="password"
          required
          id="password"
          name="password"
          placeholder="Enter Password"
        />
        <button type="submit">login</button>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
}

export default withRouter(Login);
