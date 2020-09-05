import React, { useContext, useState, useEffect } from "react";
import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { Card, Button, Collapse } from 'react-bootstrap'
import AddFriendModal from '../AddFriendModal'
import "./ShowPostStyle.css"

function PostCard(props) {
    const [open, setOpen] = useState(false)
    const [modal, setModal] = useState()
    const handleHide = () => setModal()
    const firebase = useContext(FirebaseContext)

    let localDisplay = props.comments.map(comment => {
        let user = comment.split(',').pop()
        let content = comment.substring(0, comment.lastIndexOf(','))
        let display = content + ' - ' + user
        return <p onClick={() => {
            setModal(<AddFriendModal id={user} handleHide={handleHide}/>)
        }}>{display}</p>
    })

    return (
        <div className="PostCard">
            <Card>
                <Card.Header>
                    <Card.Title onClick={() => {
                        setModal(<AddFriendModal id={props.user} handleHide={handleHide}/>)
                    }}>{props.user}</Card.Title>
                    <Card.Text style={{ wordWrap: "breakWord" }}>
                        <h4>{props.title}</h4>
                        <p>{props.content}</p>
                    </Card.Text>
                    <Button onClick={() => setOpen(!open)}
                        aria-expanded={open}>
                        {props.comments.length} comments
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
                                    // console.log('clikced')
                                    firebase.db.collection('post').doc(props.id).update({
                                        comments: firebase.fb.firestore.FieldValue.arrayUnion(values.comment + ',' + props.currentUser)
                                    }).then(
                                        alert("Posted!")
                                    ).catch(error => alert(error))
                                }}
                            >
                                <Form className="form-inline ">

                                      <div className="form-group mb-4">
                                        <Field className="form-control-plaintext com-input" as="input" placeholder="say something..." name="comment" />
                                        <Button type="submit" className="btn btn-primary mb-2 com-but">+</Button>

                                      </div>

                                </Form>
                            </Formik>
                        </Card.Footer>


                    </div>
                </Collapse>
            </Card>
            {modal}
        </div>
    )
}

export default PostCard
