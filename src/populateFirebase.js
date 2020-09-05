import React, {useState, useEffect, useContext} from 'react'
import FirebaseContext from './Firebase'

function Populator() {
    const firebase = useContext(FirebaseContext)
    firebase.collection("movieTester").doc("testUser").set({
        movieID: ['tt4566758','tt6723592','tt8946378']
    })
}

export default Populator