import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations">Locations</Link>
                {/*this is how the links on the nav bar are created. give it a className for css and set the li that the link is wrapped in to "active"*/}
            </li>
            <li className="navbar__item ">
                <Link className="navbar__link" to="/products">Products</Link>
            </li>
            <li className="navbar__item ">
                <Link className="navbar__link" to="/customers">Customers</Link>
            </li>

            <li className="navbar__item ">
                <Link className="navbar__link" to="/productLocations?_expand=productId">Purchase Options</Link>
            </li>
            <li className="navbar__item ">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li>
            <li className="navbar__item ">
                <Link className="navbar__link" to="/purchases">My Orders</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("kandy_customer")
                        }
                    }>
                    Logout</Link>
            </li>
            

        </ul>
    )
}