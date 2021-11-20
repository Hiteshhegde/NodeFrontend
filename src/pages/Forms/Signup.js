import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useEffect } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import "./Signup.css";
function Signup({ history }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/add-sub");
    }
  }, [history]);
  const responseGoogle = (response) => {
    console.log("google res ", response);
    setUser({
      username: response.profileObj.name,
      email: response.profileObj.email,
      password: response.profileObj.googleId,
    });
  };
  const SubmissionHandler = (e) => {
    e.preventDefault();
    console.log("Submitting");
    setUser({
      username: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(user, "To be submitted");
  };
  useEffect(() => {
    axios
      .post("/auth/register", user)
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        axios
          .post("/api/add", {
            username: user.username,
            email: user.email,
          })
          .then((res) => console.log("RESPONSE WHILE MAKING POST", res))
          .catch((err) => console.log("Error while making user's post " + err));
        history.push("/add-sub");
        // console.log(res);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log("ERROR IN MAKING USER", error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("ERROR REQUEST MAKING USER", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }, [user]);
  return (
    <div className="main-block">
      <h1>Registration</h1>
      <form onSubmit={SubmissionHandler}>
        {/* <hr /> */}
        {/* <div className="account-type">
          <input
            type="radio"
            value="none"
            id="radioOne"
            name="account"
            checked
          />
          <label for="radioOne" className="radio">
            Personal
          </label>
          <input type="radio" value="none" id="radioTwo" name="account" />
          <label for="radioTwo" className="radio">
            Company
          </label>
        </div> */}
        <hr />
        <p>
          Already have an account? <Link to="/login">login</Link>
        </p>
        <label id="icon" for="name">
          <i className="fas fa-envelope"></i>
        </label>
        <input
          type="email"
          name="email"
          // id="name"
          placeholder="Email"
          required
        />
        <label id="icon" for="name">
          <i className="fas fa-user"></i>
        </label>
        <input
          type="text"
          name="name"
          // id="name"
          placeholder="Username"
          required
        />
        <label id="icon" for="name">
          <i className="fas fa-unlock-alt"></i>
        </label>
        <input
          type="password"
          name="password"
          // id="name"
          placeholder="Password"
          required
        />
        <hr />
        <div className="gender">
          <input type="radio" value="none" id="male" name="gender" checked />
          <label for="male" className="radio">
            Male
          </label>
          <input type="radio" value="none" id="female" name="gender" />
          <label for="female" className="radio">
            Female
          </label>
          {/* <input type="radio" value="none" id="female" name="gender" />
          <label for="female" className="radio">
            Others
          </label> */}
        </div>
        <hr />
        <div className="btn-block">
          <p>
            By clicking Register, you agree on our <a href="">Privacy Policy</a>
            .
          </p>
          <GoogleLogin
            clientId="389002445283-brs5gama697n6ac8tvahsh7n5hp2595c.apps.googleusercontent.com"
            buttonText="Continue with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Signup);
