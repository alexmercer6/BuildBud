const express = require("express")
const session = require("express-session")
const db = require("../db/database.js")
const router = express.Router()
const bcrypt = require("bcrypt")

function isValidPassword(plainTextPassword, passwordHash) {
    // Returns true or false if the passwords match
    return bcrypt.compareSync(plainTextPassword, passwordHash)
}

//access the session name
router.get("/", (request, response) => {
    response.json({
        sessionName: request.session.name,
        sessionId: request.session.userId,
        sessionEmail: request.session.email,
        sessionLoggedIn: request.session.loggedIn,
    })
})

router.post("/", (request, response) => {
    let sql = `SELECT name, email, password_hash, user_id FROM users`

    //get email and password from form
    const email = request.body.email
    const password = request.body.password

    //check the email and pw in DB
    db.query(sql).then((dbResponse) => {
        for (const user of dbResponse.rows) {
            //if there is a match set the session cookies
            if (
                user.email === email &&
                isValidPassword(password, user.password_hash)
            ) {
                request.session.username = user.name
                request.session.userId = user.id
                request.session.email = user.email
                request.session.loggedIn = true
                response.json({ message: "logged in succesfully" })
                return
            }
        }
        //if there is not a match return a 400 and message
        response.status(400)
        response.json({
            success: "false",
            message: "Email or password is incorrect",
        })
    })
})

//deletes a session
router.delete("/", (request, response) => {
    request.session.destroy()
    response.json({ success: true })
})

module.exports = router
