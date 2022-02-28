import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Products.css"

export const ProductList = () => {
    //declare and deconstruct and array - this is a hook function that defines state
    //const below returns a value and function to accept the value (I'm getting this value and using it for this function's purpose)
    //useState takes a single arguement - the array input below
    const [products, setProducts] = useState([])
    const [selectedCandy, setSelectedCandy] = useState([])
    const history = useHistory()
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

    const selectOrderCandy = (selectedCandyId) => {
        let selectedCandyCopy = [...selectedCandy]
        if (selectedCandy.includes(selectedCandyId)) {
            selectedCandyCopy = selectedCandyCopy.filter((productId) => productId !== selectedCandyId)
            setSelectedCandy(selectedCandyCopy)
        } else {
            selectedCandyCopy.push(selectedCandyId)
            setSelectedCandy(selectedCandyCopy)
        }
    }

    const submitOrder = () => {
        const newOrder = {
            customerId: parseInt(localStorage.getItem("kandy_customer")),
            timestamp: Date.now()
        }
        fetch("http://localhost:8089/purchases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newOrder)
        }
        )
            .then((data) => data.json())
            .then((newOrder) => {
                const orderCandyPromises = selectedCandy.map((candyId) => {
                    return fetch("http://localhost:8089/purchaseItems", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            productId: candyId,
                            purchaseId: newOrder.id
                        })
                    })
                })
                return Promise.all(orderCandyPromises)
            })
            .then(() => {
                setSelectedCandy([])
            })
            .then(() => {
                history.push("/purchases")

            })

    }

    return (
        //fragment to put children under single component
        <>
        <section className="products">
            <h2>Products</h2>
                {
                    //interpolating an html representation that maps through products
                    products.map(
                        //paramater captures each individual product object as it iterates
                        (productObject) => {
                            //can only return one element - so put all html elements in one
                            //don't need dollar sign to iterate in React
                            //a unique key attribute for html elements is used in React
                            //Update the product list to replace the product type number with the actual name of the product type
                            return <div className="productContainer" key={`product--${productObject.id}`}>
                                <h4>{productObject.name}</h4>
                                <p>Price: ${productObject.price}</p>
                                <p>Category: {productObject.productType.name}</p>
                                <label className="addOrder" htmlFor="select-candy" id={`${productObject.id}`}>
                                    Add To Order
                                    <input type="checkbox" id={`${productObject.id}`} onChange={() => selectOrderCandy(productObject.id)} />
                                </label>
                            </div>
                        }
                    )
                }
            <div className="orderButton">
                <button onClick={() => { submitOrder() }}>Submit Order</button>
            </div>
            </section>
        </>
    )
}
