import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import Jobs from "./Jobs"
import { CircularProgress } from "@mui/material"

function BuilderDashboard() {
    //temporary until I set up proper log in
    const builder_id = 1
    const [address, setAddress] = useState([])
    useEffect(() => {
        const getAddress = async () => {
            const response = await axios.get(`/api/builder/jobs/${builder_id}`)
            setAddress(...address, response.data)
            // for (const job of response.data) {
            //     setAddress(...address, job.address)
            // }
        }
        getAddress()
    }, [])
    // console.log(trades)

    return (
        <div className="builder-dashboard">
            {address.length > 0 ? (
                <Jobs data={address} />
            ) : (
                <CircularProgress color="secondary" />
            )}
        </div>
    )
}

export default BuilderDashboard
