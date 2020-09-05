import React, { useContext, useState, useEffect } from "react";
import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { Card, Button, Collapse } from 'react-bootstrap'
function PostCard(props) {
    const [open, setOpen] = useState(false)
    const firebase = useContext(FirebaseContext)

    let localDisplay = props.comments.map(comment => {
        let user= comment.split(',').pop() 
        let content = comment.substring(0, comment.lastIndexOf(','))
        let display = content + ' - ' + user
        return <p>{display}</p>
    })

    return (
        <Card>
            <Card.Header>
                <Card.Title>{props.user}</Card.Title>
                <Card.Text style={{ wordWrap: "breakWord" }}>
                    <h4>{props.title}</h4>
                    <p>{props.content}</p>
                </Card.Text>
                <Button onClick={() => setOpen(!open)}
                    aria-expanded={open}>
                    Comments
                </Button>

            </Card.Header>
            <Collapse in={open}>
                <div>
                    <Card.Body>
                        {localDisplay}
                    </Card.Body>
                    <Card.Footer>
                        <Formik
                            initialValues={{ comment: '' }}
                            onSubmit={values => {
                                console.log('clikced')
                                firebase.db.collection('post').doc(props.id).update({
                                    comments: firebase.fb.firestore.FieldValue.arrayUnion(values.comment + ',' + props.currentUser)
                                }).then(
                                    alert("Posted!")
                                ).catch(error => alert(error))
                            }}
                        >
                            <Form>
                                <Field as="input" placeholder="say something..." name="comment" />
                                <Button type="submit">Comment</Button>
                            </Form>
                        </Formik>
                    </Card.Footer>


                </div>
            </Collapse>
        </Card>
    )
}

export default PostCard