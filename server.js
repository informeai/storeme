const express = require("express")
const app = express()
const router = require("./router")
const PORT = 8000
app.use(router)
app.use(express.static("front"))
app.listen(PORT,()=> console.log("Listen on port: ",PORT))
