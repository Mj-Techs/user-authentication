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
const UserHeader = () => {
  return (
    <LinkWrapper>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/Account">Account</NavLink>
      <NavLink to="/logout">Logout</NavLink>
    </LinkWrapper>
  );
};
export default UserHeader;
