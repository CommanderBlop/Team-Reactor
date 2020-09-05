
import React, { useContext, useState, useEffect } from "react";
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { Card } from 'react-bootstrap'

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

    return (
        <>
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
                <Form>
                    <label>Movie/Seires/Show Title: </label> <br/>
                    <Field as="input" name="title"/> <br/>
                    <label>Content: </label><br/>
                    <Field as="textarea" name="content"/> <br/>
                    <button type="submit">Post</button>
                </Form>
            </Formik>
        </>
    )
}

export default Post
