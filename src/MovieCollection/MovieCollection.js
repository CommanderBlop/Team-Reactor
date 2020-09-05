import React, {useState, useEffect, useContext} from 'react'
import FirebaseContext from '../Firebase'
import {useHistory, Link} from 'react-router-dom'
import MovieFinder from './addMovie'
import { Card, Button, Collapse,ListGroup,ListGroupItem } from 'react-bootstrap'
import "./collection.css"

const API_KEY = "7d667341"



function MovieCollection() {
    //const userGenreList = ['romantic', 'adventure', 'sci-fi', 'suspense', 'anime']
    const firebase = useContext(FirebaseContext)
    const mList = firebase.db.collection("movieTester").doc("testUser")
    const [userMovieList, setUserMovieList] = useState([''])
    const history = useHistory()
    //get user movie collection and put it he re\
    useEffect(() => {
        mList.get().then(function(doc) {
            if (doc.exists) {
                setUserMovieList(doc.data().movieID)
                console.log("Document data:", doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setUserMovieList(['']);
            }
            setTriggerNext(1)
            }).catch(function(error) {
                console.log("Error getting document:", error);
            })
        } ,[]
    )

    //const [userMovieList, setUserMovieList] = firetbase.db.collection("movieTester").doc("testUser")
    const [counter, setCounter] = useState(0)
    const [omdbData, setOmdbData] = useState('Loading...')

    const [triggerNext, setTriggerNext] = useState(0)
    //let textToBeDisplayed = userGenreList[Math.round(Math.random() * userGenreList.length)]
    let url = "http://www.omdbapi.com/?i=" + userMovieList[counter].toString() + "&apikey=" + API_KEY
    //console.log(url)

    //fetch data
    useEffect(() => {
        function doFetch() {
            fetch(url)
            .then(response =>
                response.json())

            .then(data => {
                setOmdbData(data)
            })
        }
        doFetch()
    }, [triggerNext])

    let title
    let genre
    let director
    let plot
    let img

    //extract needed info
    if(userMovieList != ['']) {
         title = omdbData === 'Loading...' ? omdbData : omdbData.Title
         genre = omdbData === 'Loading...' || omdbData.Genre === undefined? '' : "Genre: " + omdbData.Genre
         director = omdbData === 'Loading...' || omdbData.Director === undefined? '' : "Director: " + omdbData.Director
         plot = omdbData === 'Loading...' || omdbData.Plot === undefined ? '' : omdbData.Plot
         img = omdbData === 'Loading...' ? omdbData : omdbData.Poster
    } else {
         title = "Your collection is empty"
         genre = ''
         director = ''
         plot = ''
    }


    //button right/left click handler
    function buttonClick(counterChange) {
        if(counterChange > 0 && counter + counterChange >= userMovieList.length) {
            setCounter(0);
            setTriggerNext(triggerNext+1)
            setOmdbData('Loading...')
            return
        }
        if(counterChange < 0 && counter + counterChange < 0) {
            setCounter(userMovieList.length - 1)
            setTriggerNext(triggerNext+1)
            setOmdbData('Loading...')
            return
        }
        setCounter(counter + counterChange)
        setTriggerNext(triggerNext+1)
        setOmdbData('Loading...')
    }

    return (
        <div>


          <Card style={{ width: '25rem' }}  className="center-item">
            <Card.Img variant="top" src={img} />

            <Card.Body>
                <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    {genre}
                  </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{director}</ListGroupItem>
              <ListGroupItem>{plot}</ListGroupItem>

            </ListGroup>

            <Card.Body>
            <Button className="collection-but" onClick = {() => {history.push('/')}}>Back</Button>
            <Button className="collection-but" onClick = {() =>buttonClick(-1)}>{'<'}</Button>
            <Button className="collection-but" onClick = {() => buttonClick(1)}>{'>'}</Button>
            <Button className="collection-but" onClick = {() => {history.push('/addMovie')}}>To Search</Button>
            </Card.Body>
          </Card>
  

        </div>
    )
}

export default MovieCollection
