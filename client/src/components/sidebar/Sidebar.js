import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import DashboardIcon from "@mui/icons-material/Dashboard"
import NotificationsIcon from "@mui/icons-material/Notifications"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const drawerWidth = 240
function Sidebar({ setIsLoggedIn }) {
    const navigate = useNavigate()

    const redirectTo = (location, event) => {
        event.preventDefault()
        navigate(location)
    }

    const handleLogout = async () => {
        const response = await axios.delete("/api/session")
        navigate("/")
        setIsLoggedIn(false)
    }

    const handleClick = (text, event) => {
        if (text === "Connections") {
            redirectTo("/connections", event)
        } else if (text === "AddConnections") {
            redirectTo()
        } else if (text === "Dashboard") {
            redirectTo("/builder-dashboard", event)
        } else if (text === "Messages") {
            return
        } else if (text === "Notifications") {
            return
        } else if (text === "Logout") {
            handleLogout()
        }
    }
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <Drawer
                sx={{
                    zIndex: 0,
                    display: { xs: "none", lg: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Zing.
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    {[
                        "Connections",
                        "Add Connections",
                        "Dashboard",
                        "Messages",
                        "Notifications",
                        "Logout",
                    ].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={(event) => {
                                    handleClick(text, event)
                                }}
                            >
                                <ListItemIcon>
                                    {text === "Connections" && (
                                        <PeopleAltIcon />
                                    )}
                                    {text === "Add Connections" && (
                                        <PersonAddIcon />
                                    )}
                                    {text === "Dashboard" && <DashboardIcon />}
                                    {text === "Messages" && <MailIcon />}
                                    {text === "Notifications" && (
                                        <NotificationsIcon />
                                    )}
                                    {text === "Logout" && <ExitToAppIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box />
        </Box>
    )
}

export default Sidebar
