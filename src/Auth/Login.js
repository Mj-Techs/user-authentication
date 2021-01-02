import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import validator from "validator";
const Div = styled.div`
  margin-left: 30%;
  margin-top: 50px;
  padding-left: 10px;
  width: 450px;
  height: 300px;
  background: #33b6ff;
  text-align: center;
  border: 15px solid #33b6ff;
  border-radius: 20px;
`;
const Section = styled.div`
  width: 300px;
  height: 45px;
  margin-left: 65px;
  margin-top: 10px;
`;
const Header = styled.h1`
  margin-top: 5px;
  font-size: 2.5rem;
  font-family: sans-serif;
`;
const Input = styled.input`
  width: 300px;
  height: 35px;
  margin: 7px;
  border: 2px solid #33b6ff;
  border-radius: 15px;
  font-weight: bold;
  font-size: 1.2rem;
`;
const Button = styled.button`
  font-size: 1.3em;
  margin: 1em;
  padding: 0.25em 1.7em;
  border: 1px solid #33b6ff;
  border-radius: 15px;
  font-weight: bold;
  &:hover {
    color: white;
    background: ${(props) => (props.primary ? "red" : "green")};
  }
  font-family: sans-serif;
`;
const Span = styled.span`
  display: grid;
  margin-bottom: -20px;
  font-size: 1.2rem;
  color: #fa0000;
`;
const Paragraph = styled.p`
  font-size: 1.2rem;
  color: green;
  margin-bottom: -20px;
`;
const Login = (props) => {
  // console.log(props);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showState, setShowState] = useState(true);
  const [loginError, setLoginError] = useState({});
  const errors = {};
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCancelButton = () => {
    setEmail("");
    setPassword("");
  };
  const LoginValidation = () => {
    // email validation
    if (validator.isEmpty(email)) {
      errors.email = "sorry!! email can't be blank ";
    } else if (!validator.isEmail(email)) {
      errors.email = "invalid email formate";
    }
    // password validator
    if (validator.isEmpty(password)) {
      errors.password = "sorry!! password can't be blank";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginValidation();
    if (Object.keys(errors).length === 0) {
      setLoginError({});
      axios
        .post("http://dct-user-auth.herokuapp.com/users/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          const result = response.data;

          if (result.token) {
            setEmail("");
            setPassword("");
            localStorage.setItem("token", result.token);
            props.history.push("/", "successfully logged in");
          }
          if (result.errors) {
            setLoginError({ serverResponse: result.errors });
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      setLoginError(errors);
      setShowState(false);
    }
  };

  return (
    <Div>
      {props.location.state && showState && (
        <Paragraph>{props.location.state}</Paragraph>
      )}
      {loginError.serverResponse && <Span>{loginError.serverResponse}</Span>}
      <br />
      <Header>Login to your account</Header>
      <form onSubmit={handleSubmit}>
        <Section>
          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
          {loginError.email && <Span>{loginError.email}</Span>}
        </Section>
        <br />
        <Section>
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {loginError.password && <Span>{loginError.password}</Span>}
        </Section>
        <br />
        <Button type="submit">Login</Button>
        <Button primary type="button" onClick={handleCancelButton}>
          Cancel
        </Button>
      </form>
    </Div>
  );
};
export default Login;
