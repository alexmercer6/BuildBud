const express = require("express")
const db = require("../db/database.js")
const router = express.Router()

router.get("/jobs/:id", (req, res) => {
    const sql = `
        SELECT address, job_id FROM jobs WHERE builder_id = $1
    `
    const builder_id = req.params.id

    db.query(sql, [builder_id]).then((dbResponse) => {
        res.json(dbResponse.rows)
    })
})

router.post("/jobs/:id", (req, res) => {
    const builder_id = req.params.id
    const addressObj = req.body
    const address = `${addressObj.suburb}, ${addressObj.lotNumber} ${addressObj.streetName}, ${addressObj.city}, ${addressObj.postcode}`
    console.log(address)

    const sql = `
        INSERT INTO jobs(address, builder_id) VALUES($1, $2)
    `

    db.query(sql, [address, builder_id]).then((dbResponse) => {
        res.status(200)
        res.json({ success: true })
    })
})

router.delete("/jobs/:id", (req, res) => {
    const job_id = req.params.id
    const sql = `
        DELETE FROM jobs WHERE job_id = $1
    `

    db.query(sql, [job_id]).then((dbResponse) => {
        res.status(200)
        res.json({ success: true })
    })
})

module.exports = router
