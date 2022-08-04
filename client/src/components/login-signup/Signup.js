import "./login-signup.css"
import { Button, TextField } from "@mui/material"
import { useState } from "react"
import axios from "axios"

import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

function SignUp() {
    const [signUpForm, setSignUpForm] = useState({})

    const handleInput = (event) => {
        const name = event.target.name
        const newValue = event.target.value.toLowerCase()

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
                    type={"password"}
                    label="Password"
                    name="password"
                    onChange={(event) => {
                        handleInput(event)
                    }}
                />
                <TextField
                    className="form-inputs"
                    required
                    type={"password"}
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
                            // onFocus={() => {
                            //     console.log("change")
                            //     setSignUpForm({ ...signUpForm, job: "" })
                            // }}
                        />
                        <FormControlLabel
                            value="trade"
                            name="role"
                            control={<Radio />}
                            label="Trade"
                        />
                    </RadioGroup>
                    {signUpForm.role === "trade" && (
                        <TextField
                            required
                            className="form-inputs"
                            label="Job"
                            name="job"
                            onChange={(event) => {
                                handleInput(event)
                            }}
                        />
                    )}

                    {signUpForm.role === "builder" && (
                        <TextField
                            required
                            className="form-inputs"
                            label="Company"
                            name="job"
                            onChange={(event) => {
                                handleInput(event)
                            }}
                        />
                    )}
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

export default SignUp
