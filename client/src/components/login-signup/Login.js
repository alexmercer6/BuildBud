import React from "react"

import { Button, TextField } from "@mui/material"
import { useState, useContext } from "react"
import { UserContext } from "../../UserContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const [logInForm, setLogInForm] = useState({})

    const handleInput = (event) => {
        const name = event.target.name
        const newValue = event.target.value

        setLogInForm({ ...logInForm, [name]: newValue })
        console.log(logInForm)
    }

    const logInUser = async (data) => {
        const response = await axios.post("/api/session", data)
        setUser(response.data)
        navigate("/builder-dashboard")
    }
    return (
        <div className="form-container">
            <form className="log-in-form">
                <TextField
                    className="form-inputs"
                    required
                    label="Email"
                    name={"email"}
                    onChange={(event) => {
                        handleInput(event)
                    }}
                />

                <TextField
                    className="form-inputs"
                    required
                    label="Password"
                    type={"password"}
                    name="password"
                    onChange={(event) => {
                        handleInput(event)
                    }}
                />

                <Button
                    className="form-inputs"
                    variant="contained"
                    onClick={(event) => {
                        event.preventDefault()
                        logInUser(logInForm)
                    }}
                >
                    Log In
                </Button>
            </form>
        </div>
    )
}

export default Login
