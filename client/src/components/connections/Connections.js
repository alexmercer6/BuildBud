import axios from "axios"
import { useEffect, useState, Fragment } from "react"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { Button } from "@mui/material"
function Connections() {
    const [trades, setTrades] = useState({})
    const [builders, setBuilders] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isBuilderLoading, setIsBuilderLoading] = useState(true)

    const stringToColor = (string) => {
        let hash = 0
        let i

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash)
        }

        let color = "#"

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff
            color += `00${value.toString(16)}`.slice(-2)
        }

        return color
    }

    const showNewTrades = (friend) => {
        return (
            <>
                <ListItem alignItems="flex-start" key={friend.user_id}>
                    <ListItemAvatar key={friend.user_id}>
                        <Avatar
                            alt={friend.name}
                            sx={{
                                bgcolor: stringToColor(friend.name),
                            }}
                        >
                            {friend.name.charAt(0).toUpperCase()}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={friend.name.toUpperCase()}
                        secondary={
                            <Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                ></Typography>
                                {friend.email}
                            </Fragment>
                        }
                    />
                    <Button size="small" variant="outlined">
                        Add to Connections
                    </Button>
                </ListItem>
                <Divider variant="inset" component="li" />
            </>
        )
    }

    useEffect(() => {
        const getTradesList = async () => {
            const response = await axios.get("/api/users/trades")

            setTrades(response.data)
            setIsLoading(false)
        }

        const getBuildersList = async () => {
            const response = await axios.get("/api/users/builders")

            setBuilders(response.data)
            setIsBuilderLoading(false)
        }
        getBuildersList()
        getTradesList()
    }, [isLoading])
    return (
        <div>
            <div>
                <h1>New Trades</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    trades.map((trade, index) => {
                        return (
                            <List
                                key={index}
                                sx={{
                                    width: "100%",
                                    maxWidth: 360,
                                    bgcolor: "background.paper",
                                }}
                            >
                                {showNewTrades(trade)}
                            </List>
                        )
                    })
                )}
            </div>
            <div>
                <h1>New Builders</h1>
                {isBuilderLoading ? (
                    <p>Loading...</p>
                ) : (
                    builders.map((builder, index) => {
                        return (
                            <List
                                key={index}
                                sx={{
                                    width: "100%",
                                    maxWidth: 360,
                                    bgcolor: "background.paper",
                                }}
                            >
                                {showNewTrades(builder)}
                            </List>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Connections
