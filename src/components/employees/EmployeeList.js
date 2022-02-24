import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Employee.css"


export const EmployeeList = () => {
    //export function
    const [employees, changeEmployee] = useState([])

    const history = useHistory()

    useEffect(
        //get data from API and pull it into application state of employees
        () => {
            fetch("http://localhost:8089/employees")
                .then(res => res.json())
                .then((employeeAPIData) => {
                    //you can not directly modify state in React - you always have to use the function that it provided you in useState
                    //arguement is what you want the state to be
                    changeEmployee(employeeAPIData)
                })
        },
        []
    )




    return (
        <>
            <h2>Employees</h2>
            <div className="hire_button">
                <button className="btn btn-primary" onClick={() => history.push("/employee/form")}>Hire New Employee</button>
            </div>
            {
                employees.map(
                    (employeeObj) => {
                        return <section className="employee_data" key={`employee--${employeeObj.id}`}>

                            <div>
                                <div><h4>{employeeObj.name}</h4></div>
                                <div>{employeeObj.location}</div>
                                <div>Is a Manager: {employeeObj.manager === true ? "yes" : "no"}</div>
                                <div>Is Full time: {employeeObj.fullTime === true ? "yes" : "no"}</div>
                                <div>Hourly rate: ${employeeObj.hourlyRate}.00</div>
                            </div>
                        </section>
                    }
                )
            }
        </>


    )
}