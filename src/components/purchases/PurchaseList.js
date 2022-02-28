import React, { useEffect, useState } from "react";
import "./Purchases.css"


export const PurchaseList = () => {
    const [purchases, setPurchases] = useState([])
    const [orderedItems, setOrderedItems] = useState([])
    const customerPurchases = purchases.filter((purchase) => purchase.customerId === parseInt(localStorage.getItem("kandy_customer")));


    useEffect(() => {
        fetch(`http://localhost:8089/purchases/?_expand=customer`)
            .then((resp) => resp.json())
            .then((data) => {
                setPurchases(data);
            })
    },
        []
    )


    useEffect(() => {
        fetch("http://localhost:8089/purchaseItems?_expand=product")
            .then((resp) => resp.json())
            .then((data) => {
                setOrderedItems(data)
            })
    },
        []
    )

    return (
        <>
            <section className="purchases">
            <h2>Purchases</h2>
            {
                customerPurchases.map((purchaseObject) => {
                    const transactionItems = orderedItems.filter((transactionOrderedItem) => transactionOrderedItem.purchaseId === purchaseObject.id)
                    const purchaseTotal = transactionItems.map(transactionItem => transactionItem.product.price)
                    function simpleArraySum(ar) {
                        var sum = 0;
                        for (var i = 0; i < ar.length; i++) {
                            sum += ar[i];
                        }
                        return sum.toFixed(2);
                    }

                    return <div className="purchasesContainer" key={`purchase--${purchaseObject.id}`}>
                        <p>Transaction #: {purchaseObject.id}</p>
                        <p>Customer: {purchaseObject.customer.name}</p>
                        <p>Shipping Address: {purchaseObject.customer.address} {purchaseObject.customer.city}, {purchaseObject.customer.state} {purchaseObject.customer.zip}</p>
                        <ul>
                            <p className="kandyBag">Kandy Bag:
                                {transactionItems.map((transactionItemObject) => {
                                    return <li key={`products--${transactionItemObject.product.id}`}>{transactionItemObject.product.name}</li>
                                })}


                            </p>
                        </ul>

                        <p>Order Total ${`${simpleArraySum(purchaseTotal)}`}</p>
                    </div>
                })
            }</section>
        </>

    )
}