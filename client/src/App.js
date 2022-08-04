import "./App.css"
import axios from "axios"
import { UserContext } from "./UserContext"
import { useEffect, useState } from "react"
import Navbar from "./components/navbar/Navbar"
import Login from "./components/login-signup/Login"
import SignUp from "./components/login-signup/SignUp"
import BuilderTrade from "./components/builder/BuilderTrade"
import BuilderTrades from "./components/builder/BuilderTrades"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BuilderDashboard from "./components/builder/BuilderDashboard"
import ProtectedRoute from "./components/navbar/protectRoute/ProtectedRoute"
import Connections from "./components/connections/Connections"
import Sidebar from "./components/sidebar/Sidebar"
import { CircularProgress, Fade } from "@mui/material"

function App() {
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get("/api/session")

            let user = response.data

            if (user.sessionLoggedIn) {
                setIsLoggedIn(true)
                setUser(user)
            } else {
                setIsLoggedIn(false)
            }
        }
        getUser()
    }, [])
    if (isLoggedIn === null) {
        return (
            <div className="App">
                <CircularProgress color="primary" />
            </div>
        )
    }

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ user, setUser }}>
                    <Navbar
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                    />

                    {/* {isLoggedIn && <div className="left-container"></div>} */}

                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                        <Route
                            path="/login"
                            element={
                                <Login
                                    isLoggedIn={isLoggedIn}
                                    setIsLoggedIn={setIsLoggedIn}
                                />
                            }
                        />
                        <Route path="/" element="Home" />
                        <Route
                            path="/builder-dashboard"
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <div className="container">
                                        <Sidebar
                                            setIsLoggedIn={setIsLoggedIn}
                                        />
                                        <BuilderDashboard />
                                    </div>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/builder-dashboard/:user_id/job/:job_id"
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <div className="container">
                                        <Sidebar
                                            setIsLoggedIn={setIsLoggedIn}
                                        />
                                        <BuilderTrades />
                                    </div>
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/builder-dashboard/:user_id/job/:job_id/:trade"
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <div className="container">
                                        <Sidebar
                                            setIsLoggedIn={setIsLoggedIn}
                                        />
                                        <BuilderTrade />
                                    </div>
                                </ProtectedRoute>
                            }
                        />
                        {console.log("check", isLoggedIn)}
                        <Route
                            path="/connections"
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <div className="container">
                                        <Sidebar
                                            setIsLoggedIn={setIsLoggedIn}
                                        />
                                        <Connections />
                                    </div>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App
