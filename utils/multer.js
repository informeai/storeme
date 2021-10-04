const crypto = require("crypto")
const multer = require("multer")
const {createBucketGCP} = require("../services/gcp")
const storageGCP = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/gcp')
  },
  filename: function (req, file, cb) {
    const hashName = crypto.randomBytes(10).toString('hex')
    cb(null, hashName + '-' + file.originalname)
    createBucketGCP()
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