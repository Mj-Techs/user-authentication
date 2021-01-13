import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0px;
  padding: 0px;
`;
const NavLink = styled(Link)`
  padding: 20px;
  font-size: 1.8rem;
  color: rgb(0, 0, 255);
  text-decoration: none;
  font-family: sans-serif;
  color: #03070b;
  font-weight: bold;
`;
const Div = styled.div`
  margin-top: 20px;
`;
const Navbar = (props) => {
  const { isLoggedIn } = props;

  return (
    <LinkWrapper>
      <NavLink to="/">Home</NavLink>
      {isLoggedIn ? (
        <Div>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/mynotes">MyNotes</NavLink>
          <NavLink to="/logout">Logout</NavLink>
        </Div>
      ) : (
        <Div>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </Div>
      )}
    </LinkWrapper>
  );
};
export default Navbar;
