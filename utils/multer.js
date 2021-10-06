const crypto = require("crypto")
const path = require("path")
const multer = require("multer")
const {addFileBucketGCP} = require("../services/gcp")
const storageGCP = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, './tmp/gcp')
  },
  filename: async function (req, file, cb) {
    const hashName = crypto.randomBytes(10).toString('hex')
    let fileName = hashName + '-' + file.originalname
    let filePath = path.resolve(__dirname,"../tmp/gcp",fileName)
    cb(null, fileName)
    await addFileBucketGCP(fileName,filePath)
    
  }
})

const storageAWS = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/aws')
  },
  filename: function (req, file, cb) {
    const hashName = crypto.randomBytes(10).toString('hex')
    cb(null, hashName + '-' + file.originalname)
  }
})
const uploadGCP = multer({storage: storageGCP})
const uploadAWS = multer({storage: storageAWS})
module.exports = {uploadGCP, uploadAWS}