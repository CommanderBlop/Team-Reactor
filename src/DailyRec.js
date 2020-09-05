import React, {useState, useEffect, useContext} from 'react'
import FirebaseContext from './Firebase'
const API_KEY = "7d667341"

function DailyRec(props) {
    let [movieData, setMovieData] = useState({

    })
    console.log(props)
    useEffect(() => {
        async function matching() {
            let match = false
            console.log("enter while loop")
            while(true) {
                let randMovieID = ''
                let i = 0 
                for(i = 0; i < 7; i++) {
                    randMovieID += Math.round(Math.random() * 10).toString()
                }
                let url = "http://www.omdbapi.com/?i=tt" + randMovieID + "&apikey=" + API_KEY
                let response = await fetch(url)
                let data = await response.json()
                console.log(data)
                // setMovieData(
                //     dataSet = data.Response !== "False" && data.Genre.includes(userGenre) && data
                //     )
                    
                if(data.Response !== "False" && data.Genre.includes(props.userGenre) && data.Type === "movie") {
                    setMovieData(
                        data
                    )
                    break
                }
                    // .then(response => 
                    //     response.json())
                    // .then(data => {setMovieData({
                    //     movieData: data.Response && data.genre.includes(userGenre) && data
                    //     })})
                console.log("finish one loop")
            }
        }
        matching()
    }, [])
    

    return (
        <div>
            <h1>{movieData == undefined ? "Loading today's recommendation" : ''}</h1>
            <img src = {movieData.Poster} ></img>
            <h1>{movieData.Title}</h1>
            <h3>{"Length: " + movieData.Length}</h3>
            <h3>{"Director: " +movieData.Director}</h3>
            <p>{"Plot: " +movieData.Plot}</p>
        </div>
    )
}

export default DailyRec

