import "./Builder.css"
import { Button } from "@mui/material"
import PlumbingIcon from "@mui/icons-material/Plumbing"
import CarpenterIcon from "@mui/icons-material/Carpenter"
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices"
import GridViewIcon from "@mui/icons-material/GridView"
import Crop75Icon from "@mui/icons-material/Crop75"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import ArchitectureIcon from "@mui/icons-material/Architecture"

import { useNavigate } from "react-router-dom"
function BuilderTrades() {
    const navigate = useNavigate()

    const redirectTo = (location, event) => {
        event.preventDefault()
        navigate(location)
    }
    const trades = [
        { job: "Bricklayer", icon: <Crop75Icon /> },
        { job: "Carpenter", icon: <CarpenterIcon /> },
        { job: "Concretor", icon: <LocalShippingIcon /> },
        { job: "Electrician", icon: <ElectricalServicesIcon /> },
        { job: "Plumber", icon: <PlumbingIcon /> },
        { job: "Drainage Plumber", icon: <PlumbingIcon /> },
        { job: "Surveyor", icon: <ArchitectureIcon /> },
        { job: "Tiler", icon: <GridViewIcon /> },
    ]
    const handleClick = () => {}

    const buttonStyle = {
        height: "100px",
        width: "300px",
    }
    return (
        <div className="builder-dashboard">
            <div className="builder-trades">
                {trades.map((trade, index) => {
                    return (
                        <Button
                            key={index}
                            alt={trade.job}
                            variant="contained"
                            style={buttonStyle}
                            onClick={(event) => {
                                redirectTo(
                                    "/builder-dashboard/trades/trade",
                                    event
                                )
                            }}
                        >
                            {trade.icon}
                            {trade.job}
                        </Button>
                    )
                })}
            </div>
        </div>
    )
}

export default BuilderTrades
