import React, {useState, useEffect, useContext} from 'react'
import FirebaseContext from './Firebase'
import { Card,ListGroup,ListGroupItem, Button } from 'react-bootstrap'

const API_KEY = "7d667341"

function DailyRec(props) {
    let [movieData, setMovieData] = useState({})
    const [user, setUser] = useState()
    const [genreList, setGenreList] = useState([])
    const [loading, setLoading] = useState(true)
    const [display, setDisplay] = useState('')
    const firebase = useContext(FirebaseContext)

    firebase.auth.onAuthStateChanged(user => {
        if (user) {
            setUser(user);
        } else {
            setUser(null)
        }
    });

    useEffect(() => {
        if (user){
            firebase.db.collection('user').doc(user.uid).get().then(function(doc){
                setGenreList(doc.data().genres)
                setLoading(false)
            })
        }
    }, [user])
   
    function arrayMatch(arr1, arr2){
        let returnVal = false
        arr1.forEach(element => {
            if (arr2.includes(element)){
                returnVal = true
                return
            }
        })
        return returnVal
    }

    async function matching() {
        console.log("enter while loop")
        while(true) {
            let randMovieID = ''
            let i = 0
            for(i = 0; i < 7; i++) {
                randMovieID += Math.round(Math.random() * 10).toString()
            }
            let url = "https://www.omdbapi.com/?i=tt" + randMovieID + "&apikey=" + API_KEY
            let response = await fetch(url)
            let data = await response.json()
            console.log(data)
            let processedData = data.Response === "False" ? "Still Searching..." : "Doesn't match: " + data.Title + ",  " + data.Length + "mins,  Directed by" + 
                data.Director + ".  " + data.Plot
            setDisplay(processedData)
            if (data.Response === "False"){
                continue
            }
            let filmGenres = data.Genre.split(', ')
            
            console.log('fg', filmGenres)
            if(arrayMatch(filmGenres, genreList) && data.Type !== 'episode') {
                setMovieData(data)
                setDisplay('FOUND!')
                break
            }
            
        }
    }

    return (
        <div style={{background:'#f5f5f5', height: "40em"}}>
          {/* <h1>{movieData == undefined ? "Loading today's recommendation" : ''}</h1> */}
          <h2 style={{color:"#204051"}}>Get a movie recommendation based on your preferred genres - </h2>
          <Card style={{ width: '25rem' }}  className="center-item">

            <Card.Img variant="top" src={movieData.Poster} />

            <Card.Body>
                  <Card.Title>{movieData.Title}</Card.Title>
                  <Card.Text>
                    {movieData.Length === undefined? "Length: " : "Length: " + movieData.Length}
                  </Card.Text>
            </Card.Body>
            
            <ListGroup className="list-group-flush">
              <ListGroupItem>{movieData.Director === undefined? "Director: " : "Director: " + movieData.Director}</ListGroupItem>
              <ListGroupItem>{movieData.Plot === undefined? "Plot: " : "Plot: " + movieData.Plot}</ListGroupItem>
            </ListGroup>
          </Card>
          <br/>
            <Button onClick={matching} disabled={loading} variant="info">Feeling lucky!</Button><br/>
            <label disabled>{display}</label><br/>
            <label>Note: It might take a while to load</label>
        </div>
    )
}

export default DailyRec
