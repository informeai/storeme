//imports
const express = require("express")
const app = express()
const router = require("./routers/router")
const PORT = 8000

//midlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("front"))
app.use(router)
//listen
app.listen(PORT,()=> console.log("Listen on port: ",PORT))
