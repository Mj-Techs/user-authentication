import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
const Account = (props) => {
  const [userDetail, setUserDetail] = useState({});

  const InfoWrapper = styled.div`
    margin: 40px;
    padding-left: 20%;
  `;
  const InternalWrapper = styled.div`
    display: flex;
    margin-top: -30px;
  `;
  const InfoHeader = styled.h2`
    margin-top: 30px;
    padding-left: 90px;
  `;
  const EmailHeader = styled(InfoHeader)`
    padding-left: 150px;
  `;
  const DateHeader = styled(InfoHeader)`
    padding-left: 100px;
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
