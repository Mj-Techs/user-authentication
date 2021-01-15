import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CompleteNote from "./CompleteNote";
const Wrapper = styled.div`
  display: flex;
`;

const Title = styled.h3`
  margin: 0.5em;
  padding: 0.5em;
  font-size: 1.3em;
  background: papayawhip;
  border: none;
  border-radius: 25px;
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  font-size: 1.3em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: none;
  border-radius: 25px;
  &:hover {
    cursor: pointer;
  }
`;
const Notelist = (props) => {
  const { title, _id, pageLoader } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleTitleClick = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    const confirmRemove = window.confirm("Are You Sure?");
    if (confirmRemove) {
      axios
        .delete(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`, {
          headers: { "x-auth": localStorage.getItem("token") },
        })
        .then((response) => {
          pageLoader();
          console.log(response.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <Wrapper>
      <Title onClick={handleTitleClick}>{title}</Title>
      <Button onClick={handleDelete}>delete</Button>

      {_id && (
        <CompleteNote
          id={_id}
          isModalOpen={isModalOpen}
          ToggleModal={ToggleModal}
        />
      )}
    </Wrapper>
  );
};

export default Notelist;
