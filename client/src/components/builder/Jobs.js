import React from "react"
import "./Builder.css"
import {
    TextField,
    List,
    ListItemText,
    Avatar,
    IconButton,
    ListItemAvatar,
    ListItemButton,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import HouseIcon from "@mui/icons-material/House"

const data = ["Lot 112", "Lot 113", "Lot 114"]

function Jobs() {
    return (
        <div>
            <TextField
                id="standard-basic"
                label="Search Jobs"
                variant="standard"
            />
            <div className="listContainer">
                {data.map((house) => {
                    return (
                        <List color="primary">
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
