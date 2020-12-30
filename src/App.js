import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./Component/Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Header from "./Component/Header";
import UserHeader from "./Component/UserHeader";
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const NavHeader = styled.h1`
  margin-top: 15px;
  font-size: 2.9rem;
`;

const App = () => {
  const [token, setToken] = useState("");
  const TokenUpdate = (data) => {
    setToken(data);
  };
  // console.log(token);
  return (
    <div>
      <Wrapper>
        <NavHeader>User Auth</NavHeader>
        {token === null ? <Header /> : <UserHeader />}
      </Wrapper>
      <Route
        exact
        path="/"
        render={(props) => <Home {...props} TokenUpdate={TokenUpdate} />}
      />
      <Route
        exact
        path="/Register"
        render={(props) => <Register {...props} />}
      />
      <Route exact path="/Login" render={(props) => <Login {...props} />} />
    </div>
  );
};
export default App;
