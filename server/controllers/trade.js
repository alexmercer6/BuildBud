const express = require("express")
const db = require("../db/database.js")
const router = express.Router()

//send need materials to db for builder to retrieve

router.post("/materials/user/:user_id/job/:job_id", (req, res) => {
    const job_id = req.params.job_id
    const user_id = req.params.user_id
    const material = req.body.material
    const qty = req.body.qty
    const sql = `
        INSERT INTO materials (material, qty, job_id, user_id) VALUES ($1, $2, $3, $4)
    `
    console.log(material, qty, user_id, job_id)
    db.query(sql, [material, qty, job_id, user_id])
        .then((dbResponse) => {
            res.status(200)
            res.json({ success: true })
        })
        .catch((error) => {
            res.status(400)
            res.json({ success: false, message: error })
        })
})

module.exports = router

// "name": "alex",
//     "email": "alex@test.com",
//     "phoneNumber": "0412345678",
//     "role": "builder",
//     "password": "hello123",
//     "checkPassword": "hello123"
