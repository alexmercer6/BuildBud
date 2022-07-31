// import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

import Badge from "@mui/material/Badge"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"

import MailIcon from "@mui/icons-material/Mail"
import NotificationsIcon from "@mui/icons-material/Notifications"

import MenuIcon from "@mui/icons-material/Menu"
import HouseIcon from "@mui/icons-material/House"

import { useState, useContext } from "react"
import { Button } from "@mui/material"
import axios from "axios"
import { UserContext } from "../../UserContext"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
    const { user, setValue } = useContext(UserContext)
    const [loginState, setLoginState] = useState("Log In")
    const navigate = useNavigate()

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [unreadMessages, setUnreadMessages] = useState(0)
    const [notificationsCount, setNotificationsCount] = useState(0)

    // const isMobileMenuOpen = mobileMoreAnchorEl

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false)
        setMobileMoreAnchorEl(null)
    }

    const handleMobileMenuOpen = (event) => {
        setIsMobileMenuOpen(true)
        setMobileMoreAnchorEl(event.currentTarget)
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        const response = await axios.delete("/api/session")
        console.log(response)
        setLoginState("Log In")
    }

    const redirectTo = (location, event) => {
        event.preventDefault()
        navigate(location)
    }

    const mobileMenuId = "primary-search-account-menu-mobile"
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    <Badge badgeContent={unreadMessages} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={notificationsCount} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
        </Menu>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    {user.sessionLoggedIn ? (
                        <Button variant="standard" onClick={handleLogout}>
                            Log out
                        </Button>
                    ) : (
                        <Button
                            variant="standard"
                            onClick={(event) => {
                                redirectTo("/login", event)
                            }}
                        >
                            Log In
                        </Button>
                    )}

                    <IconButton
                        variant="link"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={(event) => {
                            redirectTo(
                                `/builder-dashboard/${user.sessionId}`,
                                event
                            )
                        }}
                    >
                        <HouseIcon />
                    </IconButton>

                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { sm: "block" } }}
                    >
                        Zing.
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
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    )
}
