import React, { useEffect, useState } from "react"

export const LocationList = () => {
    //declare and deconstruct and array - this is a hook function that defines state
    //const below returns a value and function to accept the value (I'm getting this value and using it for this function's purpose)
    //useState takes a single arguement - the array input below
    const [locations, setLocations] = useState([])
    //useState returns an array
    //built in function/hook - useEffect - takes two arguments (function and array)
    //useEffect's purpose is to run code when state changes
    //observing initial state
    useEffect(
        //get data from API and pull it into application state of locations
        () => {
            fetch("http://localhost:8089/locations")
                .then(res => res.json())
                .then((locationArray) => {
                    //you can not directly modify state in React - you always have to use the function that it provided you in useState
                    //arguement is what you want the state to be
                    setLocations(locationArray)
                })
        },
        []
    )

    return (
        //fragment to put children under single component
        <>
            <h2>Locations</h2>
            <ul>
                {
                    //interpolating an html representation that maps through locations
                    locations.map(
                        //paramater captures each individual location object as it iterates
                        (locationObject) => {
                            //can only return one element - so put all html elements in one
                            //don't need dollar sign to iterate in React
                            //a unique key attribute for html elements is used in React
                            return <li key={`location--${locationObject.id}`}>
                                <h4>{locationObject.name}</h4>
                                <p>{locationObject.address}</p>
                                <p>{locationObject.phone}</p>
                            </li>
                        }
                    )
                }
            </ul>

        </>
    )
}
