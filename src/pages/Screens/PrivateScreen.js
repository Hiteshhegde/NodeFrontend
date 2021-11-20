import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function PrivateScreen({ history }) {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState([]);
  useEffect(() => {
    console.log("Checking for token");
    if (!localStorage.getItem("authToken")) {
      console.log("Token Unavailable");
      history.push("/login");
    }
    const fetchPrivateData = () => {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      };

      axios
        .get("http://localhost:9000/private", config)
        .then((res) => {
          setPrivateData(res.data.message);
          console.log("Private Response", res);
        })
        .catch((err) => {
          localStorage.removeItem("authToken");
          setError("You are'nt authorized to view this page,Please Login");
          console.log(err.response.data, "Is the Error");
        });
    };
    fetchPrivateData();
  }, [history]);
  const logout = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };
  return <div>{error ? <h3>{error}</h3> : <></>}</div>;
}

export default PrivateScreen;
