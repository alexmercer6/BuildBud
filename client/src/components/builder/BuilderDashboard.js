import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import Jobs from "./Jobs"
import { CircularProgress } from "@mui/material"

function BuilderDashboard() {
    //temporary until I set up proper log in
    const builder_id = 1

    const [address, setAddress] = useState([])
    const [formInput, setFormInput] = useState({})
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        const getAddress = async () => {
            const response = await axios.get(`/api/builder/jobs/${builder_id}`)
            setAddress(response.data)
            console.log(address)
        }
        getAddress()
    }, [clicked])

    return (
        <div className="builder-dashboard">
            {address.length > 0 ? (
                <Jobs
                    data={address}
                    formInput={formInput}
                    setFormInput={setFormInput}
                    clicked={clicked}
                    setClicked={setClicked}
                />
            ) : (
                <CircularProgress color="secondary" />
            )}
        </div>
    )
}

export default BuilderDashboard
