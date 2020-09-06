
import React, { useContext, useState, useEffect } from "react";
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { Card, Button } from 'react-bootstrap'

function Post() {
    const firebase = useContext(FirebaseContext)
    const [user, setUser] = useState(null)

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            setUser(user);
        } else {
            setUser(null)
        }
    });

    // changed part in Form
    // <label>Movie/Seires/Show Title: </label> <br/>
    // <Field as="input" name="title"/> <br/>
    // <label>Content: </label><br/>
    // <Field as="textarea" name="content"/> <br/>
    // <button type="submit">Post</button>

    return (
        <div style={{background:'#f5f5f5', height: "40em"}}>
            <Formik
                initialValues={{ content: '', title: '' }}
                onSubmit={(values) => {
                    // alert(JSON.stringify(values, 2))
                    firebase.db.collection('post').add({
                        title: values.title,
                        content: values.content,
                        user: user.uid,
                        likes: 0,
                        comments: [],
                    }).then(
                        alert("Posted!")
                    ).catch(error => alert(error))
                }}
            >
                <Form className="Post-div">
                <div className="form-group">
                  <h3 for="exampleFormControlInput1">Movie/Seires/Show Title:</h3>
                  <Field as="input" name="title" className="form-control"/>
                </div>

                <div className="form-group">
                  <h4 for="exampleFormControlTextarea1">Content:</h4>
                  <Field as="textarea" name="content" className="form-control" />
                </div>
                <Button variant="info" type="submit">Post</Button>
                </Form>
            </Formik>
        </div>
    )
}

export default Post
