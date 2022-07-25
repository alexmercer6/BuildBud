const express = require("express")
const app = express()
const port = 4000

//import routes
// const sessionController = require("./controllers/session")
const usersController = require("./controllers/users")

//middleware
app.use(express.json())

//access the routes
// app.use("/api/session", sessionController)
app.use("/api/users", usersController)

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
