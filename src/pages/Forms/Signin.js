import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import "./Signup.css";

function Signin({ history }) {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/add-sub");
    }
  }, [history]);
  const responseGoogle = (response) => {
    setUser({
      email: response.profileObj.email,
      password: response.profileObj.googleId,
    });
    axios
      .post("/auth/login", {
        email: response.profileObj.email,
        password: response.profileObj.googleId,
      })
      .then((res) => {
        // console.log("Here is the token", res.data.token);
        if (!localStorage.getItem("authToken")) {
          localStorage.setItem("authToken", res.data.token);
          setError("");
        }
        history.push("/add-sub");
      })
      .catch((err) => {
        console.log("HERE IS THE ERROR", err.response.data);
        // if (err.response.data.error === "Invalid Credentials") {
        //   setError("Invalid Credentials");
        //   e.target.password.value = "";
        // } else if (err.response.data.error === "User Not Found") {
        //   setError("User Not Found");
        //   e.target.password.value = "";
        // }
      });
  };
  const SubmissionHandler = (e) => {
    e.preventDefault();

    setUser({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    // console.log("To send", user);
    axios
      .post("/auth/login", user)
      .then((res) => {
        // console.log("Here is the token", res.data.token);
        if (!localStorage.getItem("authToken")) {
          localStorage.setItem("authToken", res.data.token);
          setError("");
        }
        history.push("/add-sub");
      })
      .catch((err) => {
        console.log("HERE IS THE ERROR", err.response.data);
        if (err.response.data.error === "Invalid Credentials") {
          setError("Invalid Credentials");
          e.target.password.value = "";
        } else if (err.response.data.error === "User Not Found") {
          setError("User Not Found");
          e.target.password.value = "";
        }
      });
  };
  return (
    <>
      <div className="main-block">
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "pink",
            borderRadius: "50%",
            marginLeft: "calc(50% - 25px)",
          }}
        >
          logo
        </div>
        <h3 style={{ textAlign: "center" }}>
          <b>Welcome to Landing Page Maker</b>
        </h3>
        <h1>Login</h1>
        {error && <p style={{ color: "red", marginLeft: "10%" }}>{error}</p>}
        <form onSubmit={SubmissionHandler}>
          <hr />
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <label id="icon" for="name">
            <i className="fas fa-envelope"></i>
          </label>
          <input type="email" name="email" placeholder="Email" required />

          <label id="icon" for="name">
            <i className="fas fa-unlock-alt"></i>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <hr />
          <GoogleLogin
            clientId="389002445283-brs5gama697n6ac8tvahsh7n5hp2595c.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <div className="btn-block">
            <button type="submit">Submit</button>
          </div>
          <hr />
        </form>
      </div>
    </>
  );
}

export default withRouter(Signin);
