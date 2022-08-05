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
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import DashboardIcon from "@mui/icons-material/Dashboard"
import NotificationsIcon from "@mui/icons-material/Notifications"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import VpnKeyIcon from "@mui/icons-material/VpnKey"

import MenuIcon from "@mui/icons-material/Menu"
import HouseIcon from "@mui/icons-material/House"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "@mui/material"
import axios from "axios"

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
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
        const response = await axios.delete("/api/session")
        navigate("/")
        setIsLoggedIn(false)
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
            <MenuItem
                onClick={(event) => {
                    console.log("click")
                    redirectTo("/connections", event)
                }}
            >
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    <PeopleAltIcon />
                </IconButton>
                <p>Edit Connections</p>
            </MenuItem>
            <MenuItem
                onClick={(event) => {
                    redirectTo("/builder-dashboard", event)
                }}
            >
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <PersonAddIcon />
                </IconButton>
                <p>Dashboard</p>
            </MenuItem>
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
            <MenuItem onClick={handleLogout}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <ExitToAppIcon />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    )

    const renderMobileMenuLoggedOut = (
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
            <MenuItem
                onClick={(event) => {
                    redirectTo("/signup", event)
                }}
            >
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={notificationsCount} color="error">
                        <VpnKeyIcon />
                    </Badge>
                </IconButton>
                <p>Sign Up</p>
            </MenuItem>
            <MenuItem
                onClick={(event) => {
                    redirectTo("/login", event)
                }}
            >
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <LockOpenIcon />
                </IconButton>
                <p>Log In</p>
            </MenuItem>
        </Menu>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: "#fff",
                }}
            >
                <Toolbar>
                    <IconButton
                        variant="link"
                        size="large"
                        edge="start"
                        color="primary"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={(event) => {
                            redirectTo("/builder-dashboard", event)
                        }}
                    >
                        <HouseIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { sm: "block" } }}
                        color="primary"
                    >
                        Zing.
                    </Typography>

                    {!isLoggedIn && (
                        <Button
                            sx={{ m: 3, display: { xs: "none", lg: "block" } }}
                            variant="outlined"
                            onClick={(event) => {
                                redirectTo("/login", event)
                            }}
                        >
                            Log In
                        </Button>
                    )}
                    {!isLoggedIn && (
                        <Button
                            sx={{ m: 3, display: { xs: "none", lg: "block" } }}
                            variant="outlined"
                            onClick={(event) => {
                                redirectTo("/signup", event)
                            }}
                        >
                            Sign Up
                        </Button>
                    )}

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: "flex", lg: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="primary"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {isLoggedIn ? renderMobileMenu : renderMobileMenuLoggedOut}
        </Box>
    )
}
