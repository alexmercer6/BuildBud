import "./LandingPage.css"
import { useAutoAnimate } from "@formkit/auto-animate/react"

function LandingPage() {
    const [parent] = useAutoAnimate(/* optional config */)
    return (
        <div className="landing-page">
            <h1
                style={{
                    fontSize: "100px",
                    textAlign: "center",
                }}
            >
                Welcome to Zing.
            </h1>
            <h1
                style={{
                    textAlign: "center",
                }}
            >
                Connect.Track.Build
            </h1>
        </div>
    )
}

export default LandingPage
