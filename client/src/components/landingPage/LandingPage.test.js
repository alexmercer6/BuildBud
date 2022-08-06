import { render, screen, waitFor } from "@testing-library/react"
import LandingPage from "./LandingPage"

test("renders title to landing page", () => {
    render(<LandingPage />)

    const title = screen.getByTestId("main-title")
    expect(title).toHaveTextContent("Welcome to Zing.")
})
