import React from "react";
// import Modal from "react-modal";
import NoteForm from "./NoteForm";
const EditNote = (props) => {
  const { id, title, body, isNoteFormOpen, handleNoteForm, editKey } = props;
  console.log(editKey);
  return (
    <div>
      <NoteForm
        id={id}
        title={title}
        body={body}
        isNoteFormOpen={isNoteFormOpen}
        handleNoteForm={handleNoteForm}
        editKey={editKey}
      />
    </div>
  );
};

export default EditNote;
