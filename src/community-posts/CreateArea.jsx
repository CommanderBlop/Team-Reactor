import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
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
    setNote({
      title: "",
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
        <button onClick={submitNote}>Comment</button>
      </form>
    </div>
  );
}

export default CreateArea;
