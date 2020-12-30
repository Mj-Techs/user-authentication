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
  font-size: 1.5rem;
  color: blue;
  text-decoration: none;
`;
const Header = () => {
  return (
    <LinkWrapper>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </LinkWrapper>
  );
};
export default Header;
