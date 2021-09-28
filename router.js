const express = require("express")
const path = require("path")
const router = express.Router()
const indexHTML = path.join(__dirname,"front","index.html")
router.get("/", (req,res)=>{
    res.status(200).sendFile(indexHTML)
})

module.exports = router

