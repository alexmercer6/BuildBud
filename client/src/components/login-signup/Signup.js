import "./login-signup.css"
import { Button, TextField } from "@mui/material"
import { useState } from "react"
import axios from "axios"

import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

function Signup() {
    const [signUpForm, setSignUpForm] = useState({})

    const handleInput = (event) => {
        const name = event.target.name
        const newValue = event.target.value

        setSignUpForm({ ...signUpForm, [name]: newValue })
        console.log(signUpForm)
    }

    const signUpUser = async (data) => {
        console.log("clicked")
        const response = await axios.post("/api/users", data)
        console.log(response)
    }
    return (
        <div className="form-container">
            <form className="sign-up-form">
                <TextField
                    className="form-inputs"
                    required
                    label="Name"
                    name="name"
                    onChange={(event) => {
                        handleInput(event)
                    }}
                />
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
                    label="Phone No."
                    name="phoneNumber"
                    onChange={(event) => {
                        handleInput(event)
                    }}
                />
                <TextField
                    className="form-inputs"
                    required
                    label="Password"
                    name="password"
                    onChange={(event) => {
                        handleInput(event)
                    }}
                />
                <TextField
                    className="form-inputs"
                    required
                    label="Check Password"
                    name="checkPassword"
                    onChange={(event) => {
                        handleInput(event)
                    }}
                />
                <FormControl className="form-inputs">
                    <FormLabel>Role</FormLabel>
                    <RadioGroup
                        required
                        row
                        name="row-radio-buttons-group"
                        onChange={(event) => {
                            handleInput(event)
                        }}
                    >
                        <FormControlLabel
                            value="builder"
                            name="role"
                            control={<Radio />}
                            label="Builder"
                        />
                        <FormControlLabel
                            value="trade"
                            name="role"
                            control={<Radio />}
                            label="Trade"
                        />
                    </RadioGroup>
                </FormControl>
                <Button
                    className="form-inputs"
                    variant="contained"
                    onClick={(event) => {
                        event.preventDefault()
                        signUpUser(signUpForm)
                    }}
                >
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default Signup
