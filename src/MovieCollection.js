import React, {useState, useEffect} from 'react'



function MovieCollection() {
    //const userGenreList = ['romantic', 'adventure', 'sci-fi', 'suspense', 'anime']


    //get user movie collection and put it here
    let userMovieList = ['tt4566758','tt6723592','tt8946378']
    const [counter, setCounter] = useState(0)
    const [omdbData, setOmdbData] = useState('Loading')
    const [triggerNext, setTriggerNext] = useState(0)
    //let textToBeDisplayed = userGenreList[Math.round(Math.random() * userGenreList.length)]
    let url = "http://www.omdbapi.com/?i=" + userMovieList[counter].toString() + "&apikey=906b7c64"

    //fetch data
    useEffect(() => {
        fetch(url)
            .then(response => 
                response.json())
            
            .then(data => {
                setOmdbData(data)
            })
    }, [triggerNext])
    
    //extract needed info
    let title = omdbData === 'Loading' ? omdbData : omdbData.Title
    let genre = omdbData === 'Loading'? '' : "Genre: " + omdbData.Genre
    let director = omdbData === 'Loading'? '' : "Director: " + omdbData.Director
    let plot = omdbData === 'Loading' ? '' : omdbData.Plot

    //button right/left click handler
    function buttonClick(counterChange) {
        if(counterChange > 0 && counter + counterChange >= userMovieList.length) {
            setCounter(0);
            setTriggerNext(triggerNext+1)
            setOmdbData('Loading')
            return 
        }
        if(counterChange < 0 && counter + counterChange < 0) {
            setCounter(userMovieList.length - 1)
            setTriggerNext(triggerNext+1)
            setOmdbData('Loading')
            return 
        }
        setCounter(counter + counterChange)
        setTriggerNext(triggerNext+1)
        setOmdbData('Loading')
    }
    
    return (
        <div>
            <button>Back</button>
            <button onClick = {() =>buttonClick(-1)}>{'<'}</button>
            <button onClick = {() => buttonClick(1)}>{'>'}</button>
            <div>
                <h1>{title}</h1>
                <h3>{genre}</h3>
                <h3>{director}</h3>
                <p>{plot}</p>
            </div>
        </div>
    )
}

export default MovieCollection