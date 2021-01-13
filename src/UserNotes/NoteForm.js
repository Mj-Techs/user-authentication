import React, { useState, useEffect } from "react";
import styled from "styled-components";
import validator from "validator";
import axios from "axios";
import Modal from "react-modal";

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
const crossStyle = {
  position: "absolute",
  right: "0",
  top: "0",
  color: "grey",
  border: "none",
  outline: "none",
};
const buttonStyle = {
  position: "absolute",
  right: "0",
  bottom: "0",
  color: "grey",
  backgroundColor: "light",
};
const FormWrapper = styled.div`
  padding-right: 11px;
`;
const Section = styled.div`
  margin: 10px;
`;
const Input = styled.input`
  width: 300px;
  height: 35px;
  margin: 5px;
  border: 2px solid #33b6ff;
  border-radius: 15px;
  font-weight: bold;
  font-size: 1.2rem;
`;
const Textarea = styled.textarea`
  width: 300px;
  margin: 5px;
  border: 2px solid #33b6ff;
  border-radius: 15px;
  font-weight: bold;
  font-size: 1.2rem;
`;
const Button = styled.button`
  width: 80px;
  height: 40px;
  font-size: 1.5rem;
  margin-left: 15px;
  border: 2px solid #33b6ff;
  border-radius: 15px;
  &:hover {
    color: white;
    background-color: green;
  }
  padding-left: 10px;
`;

const Span = styled.span`
  display: grid;
  margin-top: -5px;
  padding-left: 10px;
  font-size: 1.2rem;
  color: #fa0000;
`;
const NoteForm = (props) => {
  const { isNoteFormOpen, handleNoteForm, id, title, body, editKey } = props;
  console.log(editKey);
  const [formData, setFormData] = useState({
    title: title ? title : "",
    body: body ? body : "",
  });
  const [noteError, setNoteError] = useState({});
  const errors = {};
  // useEffect(() => {

  // }, [id]);
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const LoginValidation = () => {
    // title validation
    if (validator.isEmpty(formData.title)) {
      errors.title = "sorry!! title can't be blank ";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    LoginValidation();

    if (Object.keys(errors).length === 0) {
      setNoteError({});
      if (!editKey) {
        axios
          .post("http://dct-user-auth.herokuapp.com/api/notes", formData, {
            headers: { "x-auth": localStorage.getItem("token") },
          })
          .then((response) => {
            // const result = response.data;
            setFormData({ title: "", body: "" });
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        axios
          .put(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, formData, {
            headers: { "x-auth": localStorage.getItem("token") },
          })
          .then((response) => {
            const result = response.data;
            console.log("put", result);
            setFormData({ title: "", body: "" });
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    } else {
      setNoteError(errors);
    }
  };
  return (
    <Modal
      isOpen={isNoteFormOpen}
      onRequestClose={handleNoteForm}
      style={customStyles}
    >
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Section>
            <Input
              type="text"
              placeholder="Title"
              value={formData.title}
              name="title"
              onChange={handleFormData}
            />
            {noteError.title && <Span>{noteError.title}</Span>}
          </Section>
          <Section>
            <Textarea
              placeholder="Body"
              rows="10"
              cols="35"
              value={formData.body}
              name="body"
              onChange={handleFormData}
            ></Textarea>
          </Section>
          <Button type="submit">save</Button>
        </form>
      </FormWrapper>
      <button onClick={handleNoteForm} style={crossStyle}>
        X
      </button>
      <button onClick={handleNoteForm} style={buttonStyle}>
        Close
      </button>
    </Modal>
  );
};

export default NoteForm;
