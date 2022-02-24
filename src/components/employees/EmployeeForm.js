import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import "./Employee.css"



export const EmployeeForm = () => {
    const [form, updateForm] = useState({
        name:"",
        hourlyRate:"",
        phone:"",
    });
    const [locationChoices, setLocationChoice]=useState([]);

    useEffect(() => {
        fetch("http://localhost:8089/locations")
        .then((res) => res.json())
        .then((locations) => {
            setLocationChoice(locations)
        });
    },[]);


    const history = useHistory()

    const saveForm = (event) => {
        event.preventDefault()

        const newForm = {
            name: form.name,
            manager: form.manager,
            fulltime: form.fulltime,
            hourlyRate: form.hourlyRate,
            phone: form.phone,
            locationId: form.location

        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newForm)
        }
        return fetch("http://localhost:8089/employees", fetchOption)
                    .then(response => response.json())
                    .then(() => {
                        history.push("/employees")
                    })
    }

    return (
        <div className="employeeFormParent">
        <form className="employeeForm">
        <h2 className="employeeForm__title">New Hire Information</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    onChange={
                        (evt) => {
                            const copy = {...form}
                            copy.name = evt.target.value
                            updateForm(copy)
                        }
                    }
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                     />
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    onChange={
                        (evt) => {
                            const copy = {...form}
                            copy.phone = evt.target.value
                            updateForm(copy)
                        }
                    }
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                     />
            </div>
            <div className="form-group">
                <label htmlFor="Hourly Rate">Hourly Rate</label>
                <input
                    onChange={
                        (evt) => {
                            const copy = {...form}
                            copy.hourlyRate = evt.target.value
                            updateForm(copy)
                        }
                    }
                    required autoFocus
                    type="number"
                    className="form-control"
                    placeholder="Hourly Rate"
                     />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="Full Time">Full Time:</label>
                <input type="checkbox"
                    onChange={
                        (evt)  => {
                            const copy = {...form}
                            copy.fulltime = evt.target.checked
                            updateForm(copy)
                        }
                    } />
            </div>
            <div className="form-group">
                <label htmlFor="manager">Manager:</label>
                <input type="checkbox"
                    onChange={
                        (evt)  => {
                            const copy = {...form}
                            copy.manager = evt.target.checked
                            updateForm(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <select  onChange={
                        (evt)  => {
                            const copy = {...form}
                            copy.location = parseInt(evt.target.value)
                            updateForm(copy)
                        }
                    }>
                        <option value="">Choose Location</option>
                        {locationChoices.map((locationObject) => {
                            return <option key={`${locationObject.id}`} value={locationObject.id}>{locationObject.name}</option>
                        })}
                    </select>
            </div>
        </fieldset>
        <button className="btn btn-primary" onClick={saveForm}>
            Finish Hiring
        </button>
    </form>
    </div>
    )
}