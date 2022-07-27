import "./Builder.css"
import { Button } from "@mui/material"
import PlumbingIcon from "@mui/icons-material/Plumbing"
import CarpenterIcon from "@mui/icons-material/Carpenter"
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices"
import GridViewIcon from "@mui/icons-material/GridView"
import Crop75Icon from "@mui/icons-material/Crop75"
function BuilderTrades() {
    const buttonStyle = {
        height: "100px",
        width: "300px",
    }
    return (
        <div className="builder-dashboard">
            <div className="builder-trades">
                <Button alt="plumber" variant="contained" style={buttonStyle}>
                    <PlumbingIcon />
                    Plumber
                </Button>
                <Button alt="carpenter" variant="contained" style={buttonStyle}>
                    <CarpenterIcon />
                    Carpenter
                </Button>
                <Button
                    alt="electrician"
                    variant="contained"
                    style={buttonStyle}
                >
                    <ElectricalServicesIcon />
                    Electrician
                </Button>
                <Button alt="tiler" variant="contained" style={buttonStyle}>
                    <GridViewIcon />
                    Tiler
                </Button>
                <Button alt="plumber" variant="contained" style={buttonStyle}>
                    <PlumbingIcon />
                    Drainage Plumber
                </Button>
                <Button alt="plumber" variant="contained" style={buttonStyle}>
                    <Crop75Icon />
                    Bricklayer
                </Button>
            </div>
        </div>
    )
}

export default BuilderTrades
