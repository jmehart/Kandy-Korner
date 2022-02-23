import React from "react";
import { LocationList } from "./Locations/LocationList";
import { ProductList } from "./Products/ProductList";



export const KandyKorner = () => {
    return (
        //fragment to put chilcdren under single component
        //you invoke a function in React with <whatToInvoke />
        <>
            <h1>Kandy Korner</h1>
            <h2>Location List</h2>
            <LocationList />
            <h2>Product List</h2>
            <ProductList />
        </>
    )
}