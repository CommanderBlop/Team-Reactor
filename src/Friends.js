
import React, { useContext, useState, useEffect } from "react";
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { Card } from 'react-bootstrap'

function Friends() {
    const firebase = useContext(FirebaseContext)
    const [user, setUser] = useState()
    const [friends, setFriends] = useState([])
    const [loading, setLoading] = useState(true)

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            setUser(user);
        } else {
            setUser(null)
        }
    });

    useEffect(() => {
        if (user){
            let friendList
            let friendsBuilder = []
            firebase.db.collection('user').doc(user.uid).get().then(function (doc) {
                friendList = doc.data().friends
            }).then(function () {
                friendList.forEach((friend, index) => {
                    firebase.db.collection('user').doc(friend).get().then(function (doc) {
                        friendsBuilder.push(doc.data())
                    })
                })
                setFriends(friendsBuilder)
                setLoading(false)
            }
            )
        }
    }, [user])

    let localDisplay = 'loading...'

    if (!loading){
        localDisplay = friends.map((friend, index) => {
            return(
                <Card>
                    <Card.Title>{friend.name}</Card.Title>
                    <p>{friend.insta && friend.insta}</p>
                    <p>{friend.snap && friend.snap}</p>
                </Card>
            ) 
        })
    }
    

    return (
        <>
        <p>{localDisplay}</p>
        </>
    )
}

export default Friends