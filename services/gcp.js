const {dotenv} = require("../config/config")
const {Storage} = require("@google-cloud/storage")
dotenv.config()
const storage = new Storage()
const bucketName = process.env.GCP_STORAGE_BUCKET
const createBucketGCP = async()=>{
    const containBucket = await verifyBucketsGCP()
    if(!containBucket){
        const bucket = await storage.createBucket(bucketName,{
            location: "ASIA"
        }).then(b => b)
        .catch(e => console.log(e))
        return bucket
    }
    
}
const verifyBucketsGCP = async()=>{
    containBucket = false
    const [buckets] = await storage.getBuckets()
    buckets.forEach((bucket)=>{
        if(bucket.name === bucketName){
            containBucket = true
        }
    })
    return containBucket
    
}

const addFileBucketGCP = async(fileName, filePath)=>{
    await createBucketGCP()
    await storage.bucket(bucketName).upload(filePath,{
        destination: fileName
    }).catch(e => console.log(e))

}

module.exports = {addFileBucketGCP}