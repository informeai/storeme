const {MongoClient} = require("mongodb")
const {dotenv} = require("../config/config")
dotenv.config()
const mongoUri = process.env.MONGO_URI
const dbName = process.env.DATABASE 
const configCollection = process.env.CONFIG_COLLECTION
client = new MongoClient(mongoUri)


async function saveConfig(data){
    await client.connect()
    const configuration = client.db(dbName).collection(configCollection)
    const result = await configuration.insertOne(data)
    client.close()
    return result
}

async function getConfig(object){
    await client.connect()
    const configuration = client.db(dbName).collection(configCollection)
    const result = await configuration.findOne(object)
    client.close()
    return result
}

async function updateConfig(object){
    const filter = {"key": "config-cred"}
    const update = {"$set": object}
    await client.connect()
    const configuration = client.db(dbName).collection(configCollection)
    const result = await configuration.updateOne(filter, update)
    client.close()
    return result
}
async function verifyConfig(){
    await client.connect()
    const configuration = client.db(dbName).collection(configCollection)
    const count = await configuration.find({}).count()
    client.close()
    return count

}


module.exports = {saveConfig,getConfig, updateConfig, verifyConfig}

