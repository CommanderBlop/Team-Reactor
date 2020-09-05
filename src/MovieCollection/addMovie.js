import React, {useContext, useState, useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import FirebaseContext from '../Firebase'
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
        {movieName: '',
        upload: false,
        title:'',
        genre:'',
        year:'',
        director:'',
        length:'',
        plot:'',
        resultID: '',
        img: '',
        data: '',
        response: false}
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
            
            .then(data => {setDataSet({
                response: data.Response === "False" ? false : true,
                title: data.Title,
                year: data.Year,
                length: data.Runtime,
                director: data.Director,
                genre: data.Genre,
                plot: data.Plot,
                resultID : data.imdbID,
                img : data.Poster,
                movieName: dataSet.movieName
            })
            console.log("finished search")})
            console.log("result:" + dataSet.searchResult)
    }

    const firebase = useContext(FirebaseContext)
    const [runSubmit, setRunSubmit] = useState(0)
    function submit() {
        if(dataSet != null && dataSet.response) {
            var movieListFire = firebase.db.collection("movieTester").doc("testUser")
            movieListFire.update({
                movieID: firebase.fb.firestore.FieldValue.arrayUnion(dataSet.resultID)
            })
            console.log("successfully added to your list!")
        }
    }
    useEffect(() => { submit()
            
    }, [runSubmit])

    function enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) { //13 is the enter keycode
            handleSearch()
            setRunSubmit(runSubmit + 1)
        } 
    }

    return(
        <div>
            <input type="text" placeholder="Add another movie" onChange = {nameInput} style = {{width: 500, height: 100, fontSize: 50}} onKeyUp = {enterPressed}/><br/>
            <button onClick = {() => {history.push('/MovieCollection')}}>Back to collection</button>
            <button onClick = {handleSearch}>Search</button>
            <button onClick = {submit}>Add to your collection!</button>
            <br/>
            <p style={{visibility: dataSet.response ? "visible" : "hidden"}, {textAlign: 'left'}}>
                <img src = {dataSet.img} ></img>
                <h1>{dataSet.response && dataSet.title}</h1>
                {dataSet.response && "Year: " + dataSet.year}<br/>
                {dataSet.response && "Length: " + dataSet.length}<br/>
                {dataSet.response && "Director: " + dataSet.director}<br/>
                {dataSet.response && "Genre: " + dataSet.genre}<br/>
                {dataSet.response && dataSet.plot}<br/>
            </p>
            
        </div>
    )
}

export default MovieFinder