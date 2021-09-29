const path = require("path")
const fs = require("fs")

async function listGCP(){
    const directoryPath = path.resolve(__dirname, '..',"tmp","gcp");
    
    return fs.readdirSync(directoryPath)
}

module.exports = {listGCP}