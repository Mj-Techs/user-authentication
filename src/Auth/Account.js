import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
const Account = (props) => {
  const [userDetail, setUserDetail] = useState({});

  const InfoWrapper = styled.div`
    width: 500px;
    margin-left: 23%;
    margin-top: 50px;
    padding-left: 10%;
    border: 15px solid #33b6ff;
    border-radius: 20px;
    color: rgb(0, 0, 0);
    background-color: #33b6ff;
    font-family: sans-serif;
  `;
  const InternalWrapper = styled.div`
    display: flex;
    margin-top: -50px;
    padding-top: 30px;
  `;
  const InfoHeader = styled.h2`
    margin-top: 30px;
    padding-left: 80px;
  `;
  const EmailHeader = styled.h2`
    margin-top: 30px;
    padding-left: 150px;
  `;
  const DateHeader = styled.h2`
    margin-top: 30px;
    padding-left: 95px;
  `;
  useEffect(() => {
    axios
      .get("http://dct-user-auth.herokuapp.com/users/account", {
        headers: { "x-auth": localStorage.getItem("token") },
      })
      .then((response) => {
        setUserDetail(response.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  return (
    <InfoWrapper>
      {Object.keys(userDetail).length > 0 && (
        <div>
          <InternalWrapper>
            <h1>username </h1>
            <InfoHeader>{userDetail.username}</InfoHeader>
          </InternalWrapper>
          <InternalWrapper>
            <h1>email </h1>
            <EmailHeader>{userDetail.email}</EmailHeader>
          </InternalWrapper>
          <InternalWrapper>
            <h1>join Date</h1>
            <DateHeader>
              {userDetail.createdAt
                .slice(0, userDetail.createdAt.indexOf("T"))
                .split("-")
                .join("/")}
            </DateHeader>
          </InternalWrapper>
        </div>
      )}
    </InfoWrapper>
  );
};
export default Account;
