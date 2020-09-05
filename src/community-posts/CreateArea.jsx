import React, { useState } from "react";

import Button from 'react-bootstrap/Button';


function CreateArea(props) {
  const [note, setNote] = useState({
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    //save note
    setNote({
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>

        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Add a new comment"
          rows="3"
        />
        <br/>
        <Button className="sub-but" onClick={submitNote}>+</Button>
      </form>
    </div>
  );
}

export default CreateArea;
