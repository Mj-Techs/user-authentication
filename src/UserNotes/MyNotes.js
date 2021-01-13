import React, { useState, useEffect } from "react";
import styled from "styled-components";
import swal from "sweetalert";
import Notelist from "./Notelist";
import NoteForm from "./NoteForm";
import axios from "axios";
import _ from "lodash";
const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 0fr 1fr;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;
const Button = styled.button`
  border: none;
  outline: none;
  width: 408.5px;
  height: 50px;
  font-size: 2rem;
  background-color: ${(props) => (props.primary ? "whitesmoke" : "gray")};
  &:hover {
    cursor: pointer;
  }
`;
const Div1 = styled.div`
  background-color: gray;
  text-align: center;
  border: 2px solid;
  border-radius: 20px;
`;
const Div2 = styled(Div1)`
  background-color: whitesmoke;
  border-radius: 20px;
`;
const Div3 = styled.div`
  padding-left: 50px;
`;
const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isNotesAvailable, setIsNotesAvailable] = useState(false);
  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
  const [PageRefresh, setPageRefresh] = useState(false);
  useEffect(() => {
    axios
      .get("http://dct-user-auth.herokuapp.com/api/notes", {
        headers: { "x-auth": localStorage.getItem("token") },
      })
      .then((response) => {
        const result = response.data;
        const reverseResult = [...result].reverse();
        setNotes(reverseResult);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [PageRefresh]);
  const pageLoader = () => {
    setPageRefresh(!PageRefresh);
  };
  const handleClick = () => {
    setPageRefresh(!PageRefresh);
    if (notes.length === 0) {
      swal("Sorry!!", "No Notes are available,please add one", "error");
    } else {
      setIsNotesAvailable(!isNotesAvailable);
    }
  };
  const handleNoteForm = () => {
    setIsNotesAvailable(false);
    setIsNoteFormOpen(!isNoteFormOpen);
  };
  return (
    <Container>
      <Div1>
        <Button onClick={handleClick}>My Notes </Button>
      </Div1>
      <Div2>
        <Button onClick={handleNoteForm} primary>
          Add Note
        </Button>
      </Div2>
      <Div3>
        {isNotesAvailable && (
          <div>
            {notes.map((note) => {
              return (
                <Notelist {...note} key={note._id} pageLoader={pageLoader} />
              );
            })}
          </div>
        )}
      </Div3>

      <div>
        {isNoteFormOpen && (
          <NoteForm
            handleNoteForm={handleNoteForm}
            isNoteFormOpen={isNoteFormOpen}
          />
        )}
      </div>
    </Container>
  );
};

export default MyNotes;
