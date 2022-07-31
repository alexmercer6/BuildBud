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
    const [user, setUser] = useState({ sessionLoggedIn: false })
    const redirect = user.sessionLoggedIn

    console.log("first")
    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get("/api/session")
            setUser(response.data)
            console.log("set state")
        }
        getUser()
    }, [])
    console.log("second")
    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ user, setUser }}>
                    {console.log(user)}
                    <Navbar />

                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="builder-dashboard"
                            element={
                                redirect ? (
                                    <BuilderDashboard />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="builder-dashboard/trades"
                            element={
                                user.sessionLoggedIn ? (
                                    <BuilderTrades />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="builder-dashboard/trades/trade"
                            element={
                                user.sessionLoggedIn ? (
                                    <BuilderTrade />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App
