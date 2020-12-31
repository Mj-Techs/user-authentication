import React, { useState } from "react";
import styled from "styled-components";
import validator from "validator";
import axios from "axios";
import swal from "sweetalert";
const Div = styled.div`
  text-align: center;
`;
const Header = styled.h1`
  font-size: 2.5rem;
`;
const Input = styled.input`
  width: 300px;
  height: 25px;
  margin: 7px;
  border: 2px solid black;
  font-weight: bold;
`;
const Button = styled.button`
  font-size: 1.3em;
  margin: 1em;
  padding: 0.25em 1.3em;
  border: 1px solid black;
  border-radius: 3px;
  font-weight: bold;
  &:hover {
    color: white;
    background: green;
  }
`;
const Span = styled.span`
  display: grid;
  font-size: 1.1rem;
  color: red;
`;
const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const errors = {};
  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const runValidation = () => {
    //username validation
    if (validator.isEmpty(username)) {
      errors.username = "username can't be empty";
    } else if (!username.match(/^[A-Za-z]+$/)) {
      errors.username = "username should have only character value";
    }
    // email validation
    if (validator.isEmpty(email)) {
      errors.email = "email can't be empty";
    } else if (!validator.isEmail(email)) {
      errors.email = "invalid email formate";
    }
    // password validation
    if (validator.isEmpty(password)) {
      errors.password = "password can't be empty";
    } else if (!validator.isLength(password, [8, 15])) {
      errors.password = "password must have atleast 8-15 characters";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    runValidation();
    if (Object.keys(errors).length === 0) {
      setFormError({});
      axios
        .post("http://dct-user-auth.herokuapp.com/users/register", {
          username: username,
          email: email,
          password: password,
        })
        .then((response) => {
          const result = response.data;
          if (result) {
            setUsername("");
            setEmail("");
            setPassword("");
            swal("Good job!", "Successfully Registered", "success", {
              buttons: false,
              timer: 2950,
            });
            setTimeout(() => {
              props.history.push(
                "/login",
                "Your account has been successfully created"
              );
            }, 3000);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      setFormError(errors);
    }
  };
  return (
    <Div>
      <Header>Register With Us</Header>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleNameChange}
        />
        {formError.username && <Span>{formError.username}</Span>}
        <br />
        <Input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        {formError.email && <Span>{formError.email}</Span>}
        <br />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePasswordChange}
        />
        {formError.password && <Span>{formError.password}</Span>}
        <br />

        <Button type="submit">Register</Button>
        <Button>Cancel</Button>
      </form>
    </Div>
  );
};
export default Register;
