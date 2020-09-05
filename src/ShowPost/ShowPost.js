
import React, { useContext, useState, useEffect } from "react";
import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { Card } from 'react-bootstrap'
import PostCard from './PostCard'

function ShowPost() {
    const firebase = useContext(FirebaseContext)
    const [user, setUser] = useState()
    const [posts, setPosts] = useState([])
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
            let postsBuilder = []
            firebase.db.collection('post').get().then(function (querySnapshot) {
                querySnapshot.forEach(post => {
                    let postHolder = post.data()
                    postHolder.id = post.id
                    postsBuilder.push(postHolder)
                })
                setPosts(postsBuilder)
            }).then(function () {
                // console.log(postsBuilder)
                setLoading(false)
                
            }).catch(function (error) {
                alert(error)
            })
            
        }
    }, [user])

    let localDisplay = 'loading...'

    if (!loading) {
        console.log(posts)
        localDisplay = posts.map((post, index) => {
            return (
                <PostCard
                    user={post.user}
                    title={post.title}
                    content={post.content}
                    comments={post.comments}
                    id={post.id}
                    currentUser={user.uid}
                />
            )
        })
    }


    return (
        <>
            <p>{localDisplay}</p>
        </>
    )
}

export default ShowPost
