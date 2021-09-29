const path = require("path")
const express = require("express")
const {uploadGCP, uploadAWS} = require("../utils/multer")
const {configSave, configGet, getFilesGCP} = require("../controllers/controllers")
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
router.post("/gcp/upload", uploadGCP.single("file"), async(req,res)=>{
    
    res.status(200).json({"status":"ok"})
})
router.get("/gcp/list", async(req,res)=>{
    let files = await getFilesGCP()
    res.status(200).json({"list":files})
})
router.post("/aws/upload", uploadAWS.single("file"), async(req,res)=>{
    
    res.status(200).json({"status":"ok"})
})

module.exports = router

