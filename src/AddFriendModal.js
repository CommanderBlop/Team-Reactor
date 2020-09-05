
import React, { useContext, useState, useEffect } from "react";
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { Card, Modal, Button } from 'react-bootstrap'

function AddFriend(props) { // pass in the user's id and handleHide function
    const firebase = useContext(FirebaseContext)
    const [user, setUser] = useState()
    const [target, setTarget] = useState()
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(true)

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            setUser(user);
        } else {
            setUser(null)
        }
    });

    const handleClick = () => {
        firebase.db.collection('user').doc(user.uid).update({
            friends: firebase.fb.firestore.FieldValue.arrayUnion(props.id)
        }).then(function () {
            firebase.db.collection('user').doc(props.id).update({
                friends: firebase.fb.firestore.FieldValue.arrayUnion(user.uid)
            })
        }).then(
            alert('Friended!')
        ).catch(function (error) {
            alert(error)
        })
    }

    useEffect(() => {
        firebase.db.collection('user').doc(props.id).get().then(function (doc) {
            if (!doc.exists) throw 'user not found'
            setTarget(doc.data())
            setLoading(false)
        }).catch(function (error) {
            alert(error)
        })
    }, [])

    let localDisplay

    if (!loading) {
        localDisplay =
            <Modal show={show} onHide={props.handleHide}>
                <Modal.Header closeButton>
                    {props.id}
                </Modal.Header>
                <Modal.Body>
                    <h4>{target.name}</h4>
                    Instagram: {target.insta ? <p>{target.insta}</p> : <p>N/A</p>} <br />
                    Snapchat: {target.snap ? <p>{target.snap}</p> : <p>N/A</p>} <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.handleHide} variant="light">Miss yo shot :(</Button>
                    <Button onClick={handleClick} disabled={!user}>Friend!</Button>
                </Modal.Footer>
            </Modal>
    }

    return (
        <>
            {localDisplay}
        </>
    )
}

export default AddFriend