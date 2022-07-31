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
    const [logout, setLogout] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get("/api/session")
            setUser(response.data)
            console.log("set state")
        }
        getUser()
    }, [logout])

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ user, setUser }}>
                    <Navbar logout={logout} setLogout={setLogout} />
                    {console.log(user)}
                    {user.sessionLoggedIn ? (
                        <p>{user.sessionName} hi</p>
                    ) : (
                        "no user"
                    )}

                    <Routes>
                        <Route path="/signup" element={<SignUp />} />
                        <Route
                            path="/login"
                            element={
                                <Login logout={logout} setLogout={setLogout} />
                            }
                        />
                        <Route path="/" element="Home" />
                        <Route
                            path="builder-dashboard"
                            element={<BuilderDashboard />}
                        />
                        <Route
                            path="builder-dashboard/:user_id/job/:job_id"
                            element={<BuilderTrades />}
                        />
                        <Route
                            path="builder-dashboard/:user_id/job/:job_id/:trade"
                            element={<BuilderTrade />}
                        />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App
