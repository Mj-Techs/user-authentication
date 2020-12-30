import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
const Div = styled.div`
  margin-top: 20px;
`;
const Header = (props) => {
  const { isLoggedIn } = props;
  const history = useHistory();
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .delete("http://dct-user-auth.herokuapp.com/users/logout", {
        headers: { "x-auth": token },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.notice) {
          localStorage.removeItem("token");
          history.push("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <LinkWrapper>
      <NavLink to="/">Home</NavLink>
      {isLoggedIn ? (
        <Div>
          <NavLink to="/Account">Account</NavLink>
          <NavLink to="/Logout" onClick={handleLogout}>
            Logout
          </NavLink>
        </Div>
      ) : (
        <Div>
          <NavLink to="/Register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </Div>
      )}
    </LinkWrapper>
  );
};
export default Header;
