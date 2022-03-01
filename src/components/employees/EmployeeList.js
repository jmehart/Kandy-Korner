import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Employee.css"


export const EmployeeList = () => {
    //export function
    const [employees, setEmployee] = useState([])
    const [totalEmployeeMessage, updateMessage]= useState("")

    const history = useHistory()

    useEffect(
        () => {
        fetch("http://localhost:8089/employees?_expand=location&_sort=locationId")
            .then((response) => response.json())
            .then((employees) => {
                setEmployee(employees);
            })
    },
    []
    )
    useEffect(
        () => {
            updateMessage(`Kandy Korner has ${employees.length} employees`)
        },
        [employees]
    )
    const deleteEmployee = (id) => {
        fetch(`http://localhost:8089/employees/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            history.go("/employees")
        })
    }

    return (
        <>
            <h2>Employees</h2>
            <div className="hire_button">
                <button className="btn" onClick={() => history.push("/employee/form")}>Hire New Employee</button>
            </div>
            {
            <div>{totalEmployeeMessage}</div>
            }
            {
                employees.map(
                    (employeeObj) => {
                        return <section className="employee_data" key={`employee--${employeeObj.id}`}>

                            <div>
                                <div><h4>{employeeObj.name}</h4></div>
                                <div>Location: {employeeObj.location.name}</div>
                                <div>Is a Manager: {employeeObj.manager === true ? "yes" : "no"}</div>
                                <div>Is Full time: {employeeObj.fullTime === true ? "yes" : "no"}</div>
                                <div>Hourly rate: ${employeeObj.hourlyRate}.00</div>
                                <div>Phone: {employeeObj.phone}</div>
                            <div>
                                <button className="btn-fire" onClick={() => { deleteEmployee(employeeObj.id) }}>Fire Employee</button>
                            </div>
                            </div>
                        </section>
                    }
                )
            }
        </>


    )
}