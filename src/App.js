import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Home from "./Component/Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Navbar from "./Component/Navbar";
import PrivateRoute from "./PrivateRoute";
import Account from "./Auth/Account";
import Logout from "./Auth/Logout";

const Wrapper = styled.div`
  width: 100%;
  background: #33b6ff;
  display: flex;
  justify-content: space-around;
`;
const NavHeader = styled.h1`
  font-family: sans-serif;
  margin-top: 15px;
  font-size: 2.9rem;
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") || false
  );

  const LoginStatus = (data) => {
    setIsLoggedIn(data);
  };

  return (
    <div>
      <Wrapper>
        <NavHeader>User Auth</NavHeader>
        <Route
          render={(props) => <Navbar isLoggedIn={isLoggedIn} {...props} />}
        />
      </Wrapper>

      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} LoginStatus={LoginStatus} />}
        />
        <Route
          exact
          path="/register"
          render={() =>
            isLoggedIn ? (
              <Redirect
                to={{
                  pathname: "/",
                  state: "true",
                }}
              />
            ) : (
              <Register />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={(props) =>
            isLoggedIn ? (
              <Redirect
                to={{
                  pathname: "/",
                  state: "true",
                }}
              />
            ) : (
              <Login {...props} />
            )
          }
        />
        <PrivateRoute
          exact
          path="/account"
          component={Account}
          isLoggedIn={isLoggedIn}
        />
        <Route
          exact
          path="/logout"
          render={() =>
            isLoggedIn ? (
              <Logout />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: "You need to login first,before accessing this route",
                }}
              />
            )
          }
        />
      </Switch>
    </div>
  );
};
export default App;
