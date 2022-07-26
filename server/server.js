const express = require("express")
const db = require("./db/database.js")
const expressSession = require("express-session")
const pgSession = require("connect-pg-simple")(expressSession)

//access secret key for setting session
require("dotenv").config()

const app = express()
const port = 4000

//import routes
const sessionController = require("./controllers/session")
const usersController = require("./controllers/users")
const builderController = require("./controllers/builder")

//set session
app.use(
    expressSession({
        store: new pgSession({
            pool: db,
            createTableIfMissing: true,
        }),
        secret: process.env.EXPRESS_SESSION_SECRET_KEY,
    })
)

//middleware
app.use(express.json())

//access the routes
app.use("/api/session", sessionController)
app.use("/api/users", usersController)
app.use("/api/builder", builderController)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
