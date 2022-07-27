import React from "react"
import "./Builder.css"
import { TextField, List, ListItemText, ListItemButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import HouseIcon from "@mui/icons-material/House"

const data = [
    "Riverstone, Lot 112",
    "Riverstone, Lot 113",
    "Apple, Lot 114",
    "Hurstville, Lot 117",
]

data.sort()

function Jobs() {
    return (
        <div>
            <TextField
                id="standard-basic"
                label="Search Jobs"
                variant="standard"
                fullWidth={true}
            />
            <div className="listContainer">
                {data.map((house, index) => {
                    return (
                        <List key={index} color="primary">
                            <ListItemButton href="/builder-dashboard/trades">
                                <HouseIcon />
                                <ListItemText>{house}</ListItemText>
                                <DeleteIcon />
                            </ListItemButton>
                        </List>
                    )
                })}
            </div>
        </div>
    )
}

export default Jobs
