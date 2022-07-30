const express = require("express")
const db = require("../db/database.js")
const router = express.Router()

router.get("/jobs/:id", (req, res) => {
    const sql = `
        SELECT address, job_id FROM jobs WHERE user_id = $1
    `
    const user_id = req.params.id

    db.query(sql, [user_id]).then((dbResponse) => {
        res.json(dbResponse.rows)
    })
})

router.post("/jobs/:id", (req, res) => {
    const user_id = req.params.id
    const addressObj = req.body
    const address = `${addressObj.suburb}, ${addressObj.lotNumber} ${addressObj.streetName}, ${addressObj.city}, ${addressObj.postcode}`
    console.log(address)

    const sql = `
        INSERT INTO jobs(address, user_id) VALUES($1, $2)
    `

    db.query(sql, [address, user_id]).then((dbResponse) => {
        res.status(200)
        res.json({ success: true })
    })
})

router.delete("/jobs/:job_id/user/:user_id", (req, res) => {
    const job_id = req.params.job_id
    const user_id = req.params.user_id
    const sql = `
        DELETE FROM jobs WHERE job_id = $1 AND user_id = $2
    `

    db.query(sql, [job_id, user_id]).then((dbResponse) => {
        res.status(200)
        res.json({ success: true })
    })
})

module.exports = router
