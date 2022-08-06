const express = require("express")
const db = require("./db/database.js")
const expressSession = require("express-session")
const pgSession = require("connect-pg-simple")(expressSession)

//access secret key for setting session
require("dotenv").config()

const app = express()
const port = process.env.PORT || 4000

//import routes
const sessionController = require("./controllers/session")
const usersController = require("./controllers/users")
const builderController = require("./controllers/builder")
const tradeController = require("./controllers/trade")
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

app.use(express.static("./client/build"))

//access the routes
app.use("/api/session", sessionController)
app.use("/api/users", usersController)
app.use("/api/builder", builderController)
app.use("/api/trade", tradeController)

/* final catch-all route to index.html defined last */
app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html")
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
