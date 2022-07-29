import "./Builder.css"
import { Button } from "@mui/material"
import PlumbingIcon from "@mui/icons-material/Plumbing"
import CarpenterIcon from "@mui/icons-material/Carpenter"
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices"
import GridViewIcon from "@mui/icons-material/GridView"
import Crop75Icon from "@mui/icons-material/Crop75"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import ArchitectureIcon from "@mui/icons-material/Architecture"
function BuilderTrades() {
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
                {trades.map((trade) => {
                    return (
                        <Button
                            alt={trade.job}
                            variant="contained"
                            style={buttonStyle}
                            href="trades/trade"
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
