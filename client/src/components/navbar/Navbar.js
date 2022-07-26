import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

import Badge from "@mui/material/Badge"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
// import MenuIcon from "@mui/icons-material/Menu"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MailIcon from "@mui/icons-material/Mail"
import NotificationsIcon from "@mui/icons-material/Notifications"
import MoreIcon from "@mui/icons-material/MoreVert"

import { useState } from "react"

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(false)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const [unreadMessages, setUnreadMessages] = useState(0)
    const [notificationsCount, setNotificationsCount] = useState(0)

    const menuId = "primary-search-account-menu"

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    ></IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { sm: "block" } }}
                    >
                        ZING
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            aria-label="show 4 new mails"
                            color="inherit"
                        >
                            <Badge badgeContent={unreadMessages} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge
                                badgeContent={notificationsCount}
                                color="error"
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
