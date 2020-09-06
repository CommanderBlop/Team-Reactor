import React, { useContext, useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import FirebaseContext from '../Firebase'
import { Card, Button, Collapse,ListGroup,ListGroupItem } from 'react-bootstrap'
import "./collection.css"

const API_KEY = "7d667341"

// function FindMovie(movieName, releaseYear) {
//     //find the movie
//     fetch("http://www.omdbapi.com/?t=" + movieName + "&y=" + releaseYear + "&apikey=" + API_KEY)
//             .then(response =>
//                 response.json())

//             .then(data => {
//                 return data
//             })
// }


// function AddMovie(movieIMDB) {
//     const firebase = useContext(FirebaseContext)
//     firebase.collection("movieTester").doc("testUser").update({
//         regions: firebase.firestore.movieID.arrayUnion(movieIMDB)
//     })
// }

// function submitNew(ID) {
//     const firebase = useContext(FirebaseContext)
//         firebase.db.collection("movieTester").doc("testUser").update({
//             regions: firebase.firestore.movieID.arrayUnion(ID)
//         })
//         console.log("successfully added to your list!")
//     return (
//         <div></div>
//     )
// }

function MovieFinder() {
    const history = useHistory()
    const [dataSet, setDataSet] = useState(
        {
            movieName: '',
            upload: false,
            title: '',
            genre: '',
            year: '',
            director: '',
            length: '',
            plot: '',
            resultID: '',
            img: '',
            data: '',
            response: false
        }
    )

    function nameInput(event) {
        setDataSet({
            movieName: event.target.value.trim()
        })
    }

    function handleSearch() {
        console.log("http://www.omdbapi.com/?t=" + dataSet.movieName + "&apikey=" + API_KEY)
        fetch("http://www.omdbapi.com/?t=" + dataSet.movieName + "&apikey=" + API_KEY)
            .then(response =>
                response.json())

            .then(data => {
                setDataSet({
                    response: data.Response === "False" ? false : true,
                    title: data.Title,
                    year: data.Year,
                    length: data.Runtime,
                    director: data.Director,
                    genre: data.Genre,
                    plot: data.Plot,
                    resultID: data.imdbID,
                    img: data.Poster,
                    movieName: dataSet.movieName
                })
                console.log("finished search")
            })
        console.log("result:" + dataSet.searchResult)
    }

    const firebase = useContext(FirebaseContext)
    const [runSubmit, setRunSubmit] = useState(0)
    function submit() {
        if (dataSet != null && dataSet.response) {
            var movieListFire = firebase.db.collection("movieTester").doc("testUser")
            movieListFire.update({
                movieID: firebase.fb.firestore.FieldValue.arrayUnion(dataSet.resultID)
            })
            firebase.db.collection("user").doc()
            movieListFire.update({
                movieID: firebase.fb.firestore.FieldValue.arrayUnion(dataSet.resultID)
            })
            console.log("successfully added to your list!")
        }
    }
    useEffect(() => {
        submit()

    }, [runSubmit])

    function enterPressed(event) {
        var code = event.keyCode || event.which;
        if (code === 13) { //13 is the enter keycode
            handleSearch()
            setRunSubmit(runSubmit + 1)
        }
    }

    // <p style={{ visibility: dataSet.response ? "visible" : "hidden" }, { textAlign: 'left' }}>
    //                 <img src={dataSet.img} ></img>
    //                 <h1>{dataSet.response && dataSet.title}</h1>
    //                 {dataSet.response && "Year: " + dataSet.year}<br />
    //                 {dataSet.response && "Length: " + dataSet.length}<br />
    //                 {dataSet.response && "Director: " + dataSet.director}<br />
    //                 {dataSet.response && "Genre: " + dataSet.genre}<br />
    //                 {dataSet.response && dataSet.plot}<br />
    //             </p>


    return (
        <div style={{background:'#f5f5f5', height: "40em"}}>
            <Card className="text-center" >
                <Card.Header>Search:</Card.Header>

                <Card.Body>

                  <Card.Text >
                    <input className="form-control form-control-lg center-item" type="text" placeholder="Add another movie" onChange={nameInput} style={{ width: 500, height: 100, fontSize: 50 }} onKeyUp={enterPressed} /><br />
                  </Card.Text>

                  <Button variant="info" className="collection-but" onClick={() => { history.push('/MovieCollection') }}>Back to collection</Button>
                  <Button variant="info" className="collection-but" onClick={handleSearch}>Search</Button>
                  <Button variant="info" className="collection-but" onClick={submit}>Add to your collection!</Button>

                </Card.Body>
            </Card>
            <br />
                <div className="card-group" style={{ width: dataSet.response ? "38rem" : "0rem" }}>

                  <div className="card" >
                    <img className="card-img-top" src={dataSet.img}></img>
                  </div>
                  <div className="card" style={{ textAlign: 'left' }}>
                    <div className="card-body">

                      <h5 className="card-title">{dataSet.response && dataSet.title}</h5>
                      <p className="card-text">{dataSet.response && "Year: " + dataSet.year}</p>
                      <p className="card-text">{dataSet.response && "Length: " + dataSet.length}</p>
                      <p className="card-text">{dataSet.response && "Director: " + dataSet.director}</p>
                      <p className="card-text">{dataSet.response && "Genre: " + dataSet.genre}</p>
                      <p className="card-text">{dataSet.response && dataSet.plot}</p>

                    </div>
                  </div>
                </div>


        </div>
    )
}

export default MovieFinder
