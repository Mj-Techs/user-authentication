import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import styled from "styled-components";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minHeight: "40%",
    minWidth: "40%",
  },
};
const buttonStyle = {
  position: "absolute",
  right: "0",
  bottom: "0",
  color: "grey",
  backgroundColor: "light",
};
const crossStyle = {
  position: "absolute",
  right: "0",
  top: "0",
  color: "grey",
  border: "none",
  outline: "none",
};
const Header = styled.h2`
  border: none;
  border-radius: 25px;
  padding: 10px;
  background-color: gray;
`;
const CompleteNote = (props) => {
  const { id, isModalOpen, ToggleModal } = props;
  const [userNote, setUserNote] = useState({});
  useEffect(() => {
    axios
      .get(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
        headers: { "x-auth": localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        setUserNote(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={ToggleModal}
        style={customStyles}
      >
        <Header>{userNote.title}</Header>
        <Header>{userNote.body}</Header>
        <button onClick={ToggleModal} style={crossStyle}>
          X
        </button>
        <button onClick={ToggleModal} style={buttonStyle}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default CompleteNote;
