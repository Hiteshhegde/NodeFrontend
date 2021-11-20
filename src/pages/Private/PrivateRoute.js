import { Redirect, Route } from "react-router";
import React from "react";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem("authToken") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      ></Route>
    </div>
  );
}

export default PrivateRoute;
