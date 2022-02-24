import React from "react"
import { Route } from "react-router-dom"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { EmployeeList } from "./employees/EmployeeList"
import { LocationList } from "./Locations/LocationList"
import { ProductList } from "./Products/ProductList"


//Define how your application will respond when the URL matches each of those patterns
//When a user clicks on one of the hyperlinks in the navigation bar, this code dictates which component should be rendered.
export const ApplicationViews = () => {
    return (
        <>
            <Route path="/locations">
            <LocationList />
            </Route>
            <Route path="/products">
            <ProductList />
            </Route>
            <Route exact path="/employees">
            <EmployeeList />
            </Route>
            <Route path="/employee/form">
                <EmployeeForm />
            </Route>
            <Route exact path="/customers">
                <CustomerList />
            </Route>
        </>
    )
}
