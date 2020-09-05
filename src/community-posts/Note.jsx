import React from "react";
import Button from 'react-bootstrap/Button';


function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <p>{props.content}</p>
    </div>
  );
}

export default Note;
