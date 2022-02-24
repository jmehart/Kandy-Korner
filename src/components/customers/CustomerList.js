import React from "react";
import { useEffect, useState } from "react";

export const CustomerList = () => {
    const [customers, setCustomer] = useState([])

    useEffect(() => {
        fetch("http://localhost:8089/customers")
            .then((resp) => resp.json())
            .then((customerArray) => {
                setCustomer(customerArray)
            })
    },
        []
    )

    return (
        <>
            <h2>Customers</h2>
            {
                customers.map(
                    (customerObject) => {
                    return <ul className="customer_list" key={`customer--${customerObject.id}`}>
                        <li>{customerObject.name}</li>
                    </ul>
                })
            }
        </>
    )
}