import React from "react";
import { Link, withRouter } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
// import { ImTwitter } from "react-icons/im";
// import { FaInstagramSquare } from "react-icons/fa";
import "./Navbar.css";
import Login from "../../pages/Screens/Login";

function Navbar({ history }) {
  const logout = () => {
    localStorage.removeItem("authToken");
    history.push("/");
  };
  const ToggleLogin = () => {
    if (!localStorage.getItem("authToken")) {
      return (
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            // marginRight: "-10%",
          }}
          className="NavLink"
        >
          Login
        </Link>
      );
    } else {
      return (
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            // marginRight: "-10%",
          }}
          className="NavLink"
          onClick={() => {
            localStorage.removeItem("authToken");
          }}
        >
          Logout
        </Link>
      );
    }
  };
  return (
    <>
      <div className="Nav">
        <Link className="NavLink" to="/">
          logo
        </Link>
        <div className="Bars">
          <MenuIcon fontSize="large" color="secondary" />
        </div>
        <div className="NavMenu">
          <Link className="NavLink" to="/home">
            Features
          </Link>
          <Link className="NavLink" to="/about">
            About Us
          </Link>
          <Link className="NavLink" to="/contact-us">
            Pricing
          </Link>
          <ToggleLogin />
          <Link
            className="AddButton"
            // style={{ backgroundColor: "transparent", border: "0px" }}
            // onClick={() => setIsSub(true)}
            to="/add-sub"
          >
            <button className="btn btn-primary">Add Form</button>
          </Link>
        </div>

        <div
          style={{
            textDecoration: "none",
            marginRight: "0%",
          }}
        >
          <div className="Navbtn2">
            <div
              className="NavBtnLink2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <InstagramIcon />
              <TwitterIcon />
            </div>
          </div>
        </div>
      </div>
      {/* <Sub IsSub={isSub} /> */}
    </>
  );
}

export default withRouter(Navbar);
