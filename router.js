const express = require("express")
const path = require("path")
const {configSave, configGet} = require("./controllers")
const router = express.Router()
const indexHTML = path.join(__dirname,"front","index.html")
router.get("/", (req,res)=>{
    res.status(200).sendFile(indexHTML)
})
router.post("/cred/save",async(req,res)=>{
    let resp = await configSave(req.body)
    res.status(200).json(resp)
})
router.post("/cred/get", async(req,res)=>{
    let resp = await configGet()
    res.status(200).json(resp)
})

module.exports = router

