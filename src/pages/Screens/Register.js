import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./register.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Register({ history }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/home");
    }
  }, [history]);
  const SubmissionHandler = (e) => {
    e.preventDefault();
    console.log("Submitting");
    setUser({
      username: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    // console.log(user, "To be submitted");
  };
  useEffect(() => {
    axios
      .post("http://localhost:9000/auth/register", user)
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        axios
          .post("http://localhost:9000/api/add", {
            username: user.username,
            email: user.email,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log("Error while making user's post " + err));
        history.push("/home");
        // console.log(res);
      })
      .catch((err) => console.log("Error " + err));
  }, [user]);
  return (
    <div>
      <form onSubmit={SubmissionHandler}>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          required
          id="name"
          name="name"
          placeholder="Enter Username"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          required
          id="email"
          name="email"
          placeholder="Enter a valid Email Id"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          required
          id="password"
          name="password"
          placeholder="Enter Password"
        />
        <button type="submit">submit</button>
        <span>
          Already have an account? <Link to="/login">login</Link>
        </span>
      </form>
    </div>
  );
}

export default withRouter(Register);
