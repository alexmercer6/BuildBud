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
            const sorted = response.data.sort((a, b) => {
                let loweredA = a.address.toLowerCase()
                let loweredB = b.address.toLowerCase()

                if (loweredA > loweredB) {
                    return -1
                }

                if (loweredA < loweredB) {
                    return 1
                }

                return 0
            })
            setAddress(sorted)
        }
        getAddress()
    }, [clicked])

    return (
        <div className="builder-dashboard">
            <Jobs
                data={address}
                formInput={formInput}
                setFormInput={setFormInput}
                clicked={clicked}
                setClicked={setClicked}
            />
        </div>
    )
}

export default BuilderDashboard
