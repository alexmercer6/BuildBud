import { Navigate } from "react-router-dom"

function ProtectedRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) {
        return <Navigate replace to="/login" />
    }
    return children
}

export default ProtectedRoute
