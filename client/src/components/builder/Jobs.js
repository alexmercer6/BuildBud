import React from "react"
import {
    TextField,
    List,
    ListItemText,
    Avatar,
    IconButton,
    ListItemAvatar,
    ListItemButton,
    // HomeIcon,
} from "@mui/material"

const data = ["Lot 112", "Lot 113", "Lot 114"]

function Jobs() {
    return (
        <div>
            <TextField
                id="standard-basic"
                label="Search Jobs"
                variant="standard"
            />
            {data.map((house) => {
                return (
                    <List>
                        <ListItemButton href="/builder-dashboard/trades">
                            <ListItemText>{house}</ListItemText>
                        </ListItemButton>
                    </List>
                )
            })}
        </div>
    )
}

export default Jobs
