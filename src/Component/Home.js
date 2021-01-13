import React, { useEffect } from "react";
import styled from "styled-components";
import image from "./auth.jpeg";
import swal from "sweetalert";
const Image = styled.img`
  height: 500px;
  width: 1000px;
  margin-top: 0px;
`;
const Div = styled.div`
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  color: green;
  margin-top: 5px;
`;
const Home = (props) => {
  useEffect(() => {
    if (props.location.state === "true") {
      swal("sorry!", "You have to logout first", "error");
    }
  }, []);
  return (
    <Div>
      {props.location.state !== "true" && (
        <Paragraph>{props.location.state}</Paragraph>
      )}
      <Image src={image} alt="authentication image" />
    </Div>
  );
};
export default Home;
