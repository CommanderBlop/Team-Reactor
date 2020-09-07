import React, { useState, useContext, useEffect} from "react";
import FirebaseContext from '../Firebase';

import './discussion-group.css';


import Note from "./Note";
import CreateArea from "./CreateArea";
import {Button} from 'react-bootstrap'



// props: database idto search for
function Home(props) {
  const id = props.id;


  const firebase = useContext(FirebaseContext);

  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    firebase.db.collection("community-discussion-board").doc(id).set({
        comments: [...notes, newNote]
    })
    .then(function() {
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  useEffect(() => {



    // if database already exist
    firebase.db.collection("community-discussion-board").doc(id).get().then(function(doc) {
    if (doc.exists) {
        const {comments} = doc.data();
        console.log("Document data:", comments);
        setNotes(comments);
    } else { // else it doesn't exist, create one
        // doc.data() will be undefined in this case
        firebase.db.collection("community-discussion-board").doc(id).set({
            comments: []
        })
        .then(function() {
            console.log("created new document for discussion");
          })

        .catch(function(error) {
            console.error("Error writing document: ", error);
        });


    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
  },[]);



  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div style={{background:'#f5f5f5', height: "40em"}}>
    <div className="dis-div">
      <h1>Community Post</h1>

      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
    </div>
  );
}

export default Home;
