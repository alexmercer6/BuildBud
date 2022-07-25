const express = require("express")
const bcrypt = require("bcrypt")
const db = require("../db/database.js")
const router = express.Router()

router.post("/:accountType", (request, response) => {
    //check if user trade of builder
    let sqlEmail = ``
    let sql = ``
    const accountType = request.params.accountType
    console.log(accountType)
    if (accountType === "builder") {
        sqlEmail = `
    SELECT email FROM builders
    `
        sql = `
    INSERT INTO builders (name, email, password_hash) 
    VALUES ($1, $2, $3)
    `
    } else {
        sqlEmail = `
    SELECT email FROM trades
    `
        sql = `
    INSERT INTO trades (name, email, password_hash) 
    VALUES ($1, $2, $3)
    `
    }

    //recieves form data from frontend
    const name = request.body.name
    const email = request.body.email
    const password = request.body.password
    const checkPassword = request.body.checkPassword
    // const checkPassWordCharacters = /^[a-zA-Z0-9~_&*%@$]+$/

    //creates the hashed password to store
    const generateHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    }

    //Sends an error message if missing fields
    if (!name || !email || !password || !checkPassword) {
        response.status(400)
        response.json({ success: false, message: "Please complete all fields" })
        return
    }

    //check database to check if email already used
    //then checks all fields are correctly filled in

    db.query(sqlEmail).then((dbResponse) => {
        for (const dbEmail of dbResponse.rows) {
            if (email === dbEmail.email) {
                response.status(400)
                response.json({
                    success: false,
                    message: "Email already used",
                })
                return
            }
        }
        if (password !== checkPassword) {
            response.status(400)
            response.json({
                success: false,
                message: "Your passwords do not match",
            })
            return
        } else if (password.length < 8 || password.length > 16) {
            response.status(400)
            response.json({
                success: false,
                message: "Your password should be 8 - 16 characters in length.",
            })
            return
            // } else if (checkPassWordCharacters.test(password)){
            //     response.status(400)
            //     response.json({
            //         success: false,
            //         message: "Your password needs to include an uppercase letter, number and symbol"
            //     })
            //     return
        } else {
            //adds user to database if successful
            const password_hash = generateHash(password)

            db.query(sql, [name, email, password_hash])
                .then((dbResponse) => {
                    response.json({ success: true })
                })
                .catch((reason) => {
                    response.status(500).json({
                        success: false,
                        message: "Unknown server error",
                    })
                })
        }
    })
})

module.exports = router
