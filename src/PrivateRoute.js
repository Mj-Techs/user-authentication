import React from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, isLoggedIn }) => {
  return (
    <Route
      render={(props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: "You need to login first,before accessing this route",
              }}
            />
          );
        }
      }}
    />
  );
};
export default PrivateRoute;
