const express = require("express")
const db = require("../db/database.js")
const router = express.Router()

router.get("/trades", (req, res) => {
    const sql = `
        SELECT * FROM trades
    `

    db.query(sql).then((dbResponse) => {
        res.json(dbResponse.rows)
    })
})

module.exports = router
