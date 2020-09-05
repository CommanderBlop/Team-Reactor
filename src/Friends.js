
import React, { useContext, useState, useEffect } from "react";
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { Card, Badge } from 'react-bootstrap'

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
        if (user) {
            let friendList
            let friendsBuilder = []
            let count = 0
            firebase.db.collection('user').doc(user.uid).get().then(function (doc) {
                friendList = doc.data().friends
            }).then(function () {
                friendList.forEach((friend, index) => {
                    firebase.db.collection('user').doc(friend).get().then(function (doc) {
                        friendsBuilder.push(doc.data())
                        count++
                        if (count === friendList.length) {
                            setLoading(false)
                        }
                    })
                })
                setFriends(friendsBuilder)
            })
        }
    }, [user])

    let localDisplay = 'loading...'

    if (!loading) {
        // console.log(friends)
        localDisplay = friends.map((friend, index) => {
            let genreBuilder = friend.genres.map(genre => {
                return <Badge className="mr-1" variant="secondary">{genre}</Badge>
            })
            return (
                <>
                    <Card>
                        <Card.Body>
                            <h4>{friend.name}</h4>
                            <h5>Genres: {genreBuilder}</h5>
                            {friend.insta ? <p>Intagram: {friend.insta}</p> : <p>Insagram: N/A</p>}
                            {friend.snap ? <p>Snapchat: {friend.snap}</p> : <p>Snapchat: N/A</p>}
                        </Card.Body>
                    </Card>
                    <br />
                </>
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