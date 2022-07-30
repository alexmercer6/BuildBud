import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BuilderDashboard from "./components/builder/BuilderDashboard"
import Navbar from "./components/navbar/Navbar"
import BuilderTrades from "./components/builder/BuilderTrades"
import BuilderTrade from "./components/builder/BuilderTrade"
import SignUp from "./components/login-signup/SignUp"
import Login from "./components/login-signup/Login"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="builder-dashboard"
                        element={<BuilderDashboard />}
                    />
                    <Route
                        path="builder-dashboard/trades"
                        element={<BuilderTrades />}
                    />
                    <Route
                        path="builder-dashboard/trades/trade"
                        element={<BuilderTrade />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
