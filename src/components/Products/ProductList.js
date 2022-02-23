import React, { useEffect, useState } from "react"

export const ProductList = () => {
    //declare and deconstruct and array - this is a hook function that defines state
    //const below returns a value and function to accept the value (I'm getting this value and using it for this function's purpose)
    //useState takes a single arguement - the array input below
    const [products, setProducts] = useState([])
    //useState returns an array
    //built in function/hook - useEffect - takes two arguments (function and array)
    //useEffect's purpose is to run code when state changes
    //observing initial state
    useEffect(
        //get data from API and pull it into application state of products
        () => {
            //Use the _expand query string parameter feature of json-server to embed the product type object in the product object when you query the API
            //use the _sort query string parameter feature of json-server to group the list of products by type
            fetch("http://localhost:8089/products?_expand=productType&_sort=productTypeId")
                .then(res => res.json())
                .then((productArray) => {
                    //you can not directly modify state in React - you always have to use the function that it provided you in useState
                    //arguement is what you want the state to be
                    setProducts(productArray)
                })
        },
        []
    )

    return (
        //fragment to put children under single component
        <>
            <ul>
                {
                    //interpolating an html representation that maps through products
                    products.map(
                        //paramater captures each individual product object as it iterates
                        (productObject) => {
                            //can only return one element - so put all html elements in one
                            //don't need dollar sign to iterate in React
                            //a unique key attribute for html elements is used in React
                            //Update the product list to replace the product type number with the actual name of the product type
                            return <li key={`product--${productObject.id}`}>
                                {productObject.name}
                            <p>Price: ${productObject.price}</p>
                            <p>Category: {productObject.productType.name}</p>
                            </li>
                        }
                    )
                }
            </ul>

        </>
    )
}
