const express = require("express")
const db = require("../db/database.js")
const router = express.Router()

router.get("/jobs/:id", (req, res) => {
    const sql = `
        SELECT address FROM jobs WHERE builder_id = $1
    `
    const builder_id = req.params.id

    db.query(sql, [builder_id]).then((dbResponse) => {
        res.json(dbResponse.rows)
    })
})

module.exports = router
