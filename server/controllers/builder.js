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

//retrieve material sent by trade for specific job
router.get("/materials/user/:user_id/job/:job_id/:trade", (req, res) => {
    const job_id = req.params.job_id
    const user_id = req.params.user_id
    const trade = req.params.trade
    console.log(trade)
    const sql = `
        SELECT material, qty, trade FROM materials WHERE job_id = $1 AND user_id = $2 AND trade = $3
    `

    db.query(sql, [job_id, user_id, trade])
        .then((dbResponse) => {
            console.log(dbResponse.rows)
            res.status(200)
            res.json(dbResponse.rows)
        })
        .catch((error) => {
            res.status(400)
            res.json(error)
        })
})

router.get("/trade/:trade_type", (req, res) => {
    const job = req.params.trade_type
    const user_id = req.session.userId
    console.log(user_id)
    const sql = `
        SELECT name, connected_user_id FROM connections WHERE user_id = $1 AND job = $2
    `

    db.query(sql, [user_id, job])
        .then((dbResponse) => {
            res.status(200)
            res.json(dbResponse.rows)
        })
        .catch((error) => {
            res.status(500)
            res.json({ error: error, message: "something went wrong" })
        })
})

module.exports = router
