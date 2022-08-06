import "./LandingPage.css"

function LandingPage() {
    return (
        <div className="landing-page">
            <h1
                data-testid="main-title"
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
