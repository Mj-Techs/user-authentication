import React, { useEffect } from "react";
import styled from "styled-components";
import image from "./auth.jpeg";

const Image = styled.img`
  height: 500px;
  width: 1000px;
  margin-top: -10px;
`;
const Div = styled.div`
  text-align: center;
`;
const TextDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
const FirstPara = styled.p`
  padding-left: 100px;
`;
const SecondPara = styled.p`
  padding-left: 1rem;
`;
const Paragraph = styled.p`
  font-size: 1.2rem;
  color: green;
  margin-top: -20px;
`;
const Home = (props) => {
  const { LoginStatus } = props;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      LoginStatus(true);
    } else {
      LoginStatus(false);
    }
  }, [LoginStatus]);
  return (
    <Div>
      {props.location.state && <Paragraph>{props.location.state}</Paragraph>}
      <Image src={image} alt="authentication image" />
      <TextDiv>
        <FirstPara>
          Authentication (from Greek: αὐθεντικός authentikos, "real, genuine",
          from αὐθέντης authentes, "author") is the act of proving an assertion,
          such as the identity of a computer system user. In contrast with
          identification, the act of indicating a person or thing's identity,
          authentication is the process of verifying that identity.
        </FirstPara>
        <SecondPara>
          It might involve validating personal identity documents, verifying the
          authenticity of a website with a digital certificate, determining the
          age of an artifact by carbon dating, or ensuring that a product or
          document is not counterfeit.
        </SecondPara>
      </TextDiv>
    </Div>
  );
};
export default Home;
