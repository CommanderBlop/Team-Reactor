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
    let url = "https://www.omdbapi.com/?i=" + userMovieList[counter].toString() + "&apikey=" + API_KEY
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

        <div style={{background:'#f5f5f5', height: "40em"}}>

                <div className="card-group center-item" style={{ width: '55rem' }}>

                  <div className="card" >
                    <img className="card-img-top" src={img}></img>
                  </div>

                  <div className="card" style={{ textAlign: 'left' }}>
                    <div className="card-body">

                      <h5 className="card-title">{title}</h5>
                      <hr/>
                      <p className="card-text">{genre}</p>
                      <hr/>
                      <p className="card-text">{director}</p>
                      <hr/>
                      <p className="card-text">{plot}</p>
                      <hr/>
                      <Button variant="info" className="collection-but" onClick = {() => {history.push('/')}}>Back</Button>
                      <Button variant="info" className="collection-but" onClick = {() =>buttonClick(-1)}>{'<'}</Button>
                      <Button variant="info" className="collection-but" onClick = {() => buttonClick(1)}>{'>'}</Button>
                      <Button variant="info" className="collection-but" onClick = {() => {history.push('/addMovie')}}>Search</Button>

                    </div>
                  </div>
                </div>

        </div>
    )
}

export default MovieCollection
