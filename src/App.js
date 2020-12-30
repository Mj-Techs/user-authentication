import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Home from "./Component/Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Header from "./Component/Header";
import PrivateRoute from "./PrivateRoute";
import Account from "./Auth/Account";
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const NavHeader = styled.h1`
  margin-top: 15px;
  font-size: 2.9rem;
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const LoginStatus = (data) => {
    setIsLoggedIn(data);
  };

  return (
    <div>
      <Wrapper>
        <NavHeader>User Auth</NavHeader>
        <Route
          render={(props) => <Header isLoggedIn={isLoggedIn} {...props} />}
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
          path="/Register"
          render={(props) => <Register {...props} />}
        />
        <Route exact path="/Login" render={(props) => <Login {...props} />} />
        <PrivateRoute
          exact
          path="/Account"
          render={(props) => <Account isLoggedIn={isLoggedIn} {...props} />}
        />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </div>
  );
};
export default App;
