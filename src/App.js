import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import Home from "./Component/Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Navbar from "./Component/Navbar";
import Account from "./Auth/Account";
import Logout from "./Auth/Logout";
import MyNotes from "./UserNotes/MyNotes";
Modal.setAppElement("#root");

const Wrapper = styled.div`
  width: 100%;
  height: 10%;
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

  const LoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
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
        <Route exact path="/" render={(props) => <Home {...props} />} />
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
              <Login {...props} LoginStatus={LoginStatus} />
            )
          }
        />
        <Route
          exact
          path="/account"
          render={() =>
            isLoggedIn ? (
              <Account />
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
        <Route
          exact
          path="/mynotes"
          render={() =>
            isLoggedIn ? (
              <MyNotes />
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
        <Route
          exact
          path="/logout"
          render={() =>
            isLoggedIn ? (
              <Logout LoginStatus={LoginStatus} />
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
