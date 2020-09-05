
import React, { useContext, useState, useEffect } from "react";
import FirebaseContext from './Firebase'
import AuthContext from './Firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Field } from 'formik'
import { Card, Form, Button } from 'react-bootstrap'

function Genre() {
    const firebase = useContext(FirebaseContext)
    const [user, setUser] = useState()
    const [genres, setGenres] = useState([])
    const history = useHistory()

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            setUser(user);
        } else {
            setUser(null)
        }
    });

    const handleNext = () => {
        firebase.db.collection('user').doc(user.uid).update({
            genres: genres, 
        }).then(
            history.push('/')
        ).catch(function(error){
            alert(error)
        })
    }

    let genreList = ['Action', 'Adult', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film Noir', 'Game Show', 'History', 'Horror', 'Musical', 'Music', 'Mystery', 'News', 'Reality TV', 'Romance', 'Sci Fi', 'Short', 'Sport', 'Talk Show', 'Thriller', 'War', 'Western']
    let checkingField = genreList.map(genre => {
        return (
            <Form.Check
                type={'checkbox'}
                id={genre}
                label={genre}
                checked={genres.includes(genre)}
                onChange={genres.includes(genre) ? () => {
                    setGenres(genres.filter(filter => filter !== genre))
                } : () => {
                    setGenres(genres.concat(genre))
                }}
            />
        )
    })


    return (
        <div>
            <h3>Choose the genres you like: </h3>
            <Form id="genre">
                {checkingField}
                {/* <Form.Check
                    type={'checkbox'}
                    id={'act ion'}
                    label={'Action'}
                    checked={genres.includes('action')}
                    onChange={genres.includes('action') ? () => {
                        setGenres(genres.filter(filter => filter !== 'action'))
                    } : () => {
                        setGenres(genres.concat('action'))
                    }}
                /> */}
                {/* <Button variant="light" onClick={() => setGenres([])}>Clear</Button> <br/> */}
                <button onClick={handleNext} disabled={!user}>Next</button>
            </Form>

        </div>
    )
}

export default Genre