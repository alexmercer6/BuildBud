import axios from "axios"
import Jobs from "./Jobs"
import { UserContext } from "../../UserContext"
import { useEffect, useState, useContext } from "react"
import { Button, Link } from "@mui/material"
import { Navigate, useNavigate } from "react-router-dom"

function BuilderDashboard() {
    //temporary until I set up proper log in
    const builder_id = 1
    const navigate = useNavigate()

    const { user, setUser } = useContext(UserContext)

    const [address, setAddress] = useState([])
    const [formInput, setFormInput] = useState({})
    const [clicked, setClicked] = useState(false)

    const redirectTo = (location, event) => {
        event.preventDefault()
        navigate(location)
    }

    useEffect(() => {
        const getAddress = async () => {
            const response = await axios.get(`/api/builder/jobs/${builder_id}`)
            const sorted = response.data.sort((a, b) => {
                let loweredA = a.address.toLowerCase()
                let loweredB = b.address.toLowerCase()

                if (loweredA > loweredB) {
                    return 1
                }

                if (loweredA < loweredB) {
                    return -1
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
