import React, {useContext, useState} from 'react'
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
                img : data.Poster
            })
            console.log("finished search")})
            console.log("result:" + dataSet.searchResult)
    }
    const firebase = useContext(FirebaseContext)
    function submit() {
        var movieListFire = firebase.db.collection("movieTester").doc("testUser")
        movieListFire.update({
            movieID: firebase.fb.firestore.FieldValue.arrayUnion(dataSet.resultID)
        })
        console.log("successfully added to your list!")
    }

    return(
        <div>
            <form>
                <input type="text" placeholder="Add another movie" onChange = {nameInput} />
            </form>
            
            <button onClick = {handleSearch}>Click to search</button>
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