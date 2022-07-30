import "./App.css"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import BuilderDashboard from "./components/builder/BuilderDashboard"
import Navbar from "./components/navbar/Navbar"
import BuilderTrades from "./components/builder/BuilderTrades"
import BuilderTrade from "./components/builder/BuilderTrade"
import SignUp from "./components/login-signup/SignUp"
import Login from "./components/login-signup/Login"
import { UserContext } from "./UserContext"
import axios from "axios"
import { useEffect, useState } from "react"

function App() {
    const [user, setUser] = useState({})
    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get("/api/session")
            setUser(response.data)
        }
        getUser()
    }, [])
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <UserContext.Provider value={user}>
                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="builder-dashboard"
                            element={
                                user.loggedIn ? (
                                    <BuilderDashboard />
                                ) : (
                                    <Navigate replace to="/login" />
                                )
                            }
                        />
                        <Route
                            path="builder-dashboard/trades"
                            element={
                                user.loggedIn ? (
                                    <BuilderTrades />
                                ) : (
                                    <Navigate replace to="/login" />
                                )
                            }
                        />
                        <Route
                            path="builder-dashboard/trades/trade"
                            element={<BuilderTrade />}
                        />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App
