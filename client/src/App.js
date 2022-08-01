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

function App() {
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    console.log("run start")

    useEffect(() => {
        const getUser = async () => {
            console.log("running")
            const response = await axios.get("/api/session")

            let user = response.data
            console.log("session", user)
            setUser(user)
            if (user.sessionLoggedIn) {
                setIsLoggedIn(true)
            }
        }
        getUser()
    }, [isLoggedIn])
    console.log("logged in ", isLoggedIn)

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ user, setUser }}>
                    <Navbar
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                    {console.log("user", user)}
                    {isLoggedIn ? <p>{user.sessionName} hi</p> : "no user"}

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
                            path="builder-dashboard"
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <BuilderDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="builder-dashboard/:user_id/job/:job_id"
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <BuilderTrades />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="builder-dashboard/:user_id/job/:job_id/:trade"
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <BuilderTrade />
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
