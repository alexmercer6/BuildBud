import React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import Jobs from "./Jobs"

function BuilderDashboard() {
    // const [trades, setTrades] = useState([])
    // useEffect(() => {
    //     const getTrades = async () => {
    //         const data = await axios.get("/api/builder/trades")
    //         console.log(data.data)
    //         for (const tradie of data.data) {
    //             setTrades(...trades, tradie.name)
    //         }
    //     }
    //     getTrades()
    // }, [])
    // console.log(trades)

    return <div className="builder-dashboard">{<Jobs />}</div>
}

export default BuilderDashboard
