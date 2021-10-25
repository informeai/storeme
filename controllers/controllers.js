const {saveConfig, getConfig, updateConfig, verifyConfig} = require("../database/database")
const {listGCP, listAWS} = require("../utils/list")

async function configSave(data){
    let resp = {}
    let count = 0

    await verifyConfig()
    .then((c)=>{
        count = c
    })
    .catch(err => console.log(err))
    if(count == 0){
        await saveConfig(data)
        .then(r => r)
        .catch(err => console.log(err))
    }else{
        await updateConfig(data)
        .then(r => r)
        .catch(err => console.log(err))
    }
    await getConfig(data)
    .then((r)=>{
        resp = r
    })
    .catch(err => console.log(err))
    return resp
}
async function configGet(){
    let resp = {}
    await getConfig({"key":"config-cred"})
    .then((r)=>{
        resp = r
    })
    .catch(err => console.log(err))
    return resp
}

async function getFilesGCP(){
    let files = []
    await listGCP()
    .then((f)=>{
        files = f
    })
    .catch(err => console.log(err))
    return files
}

async function getFilesAWS(){
    let files = []
    await listAWS()
    .then((f)=>{
        files = f
    })
    .catch(err => console.log(err))
    return files
}

module.exports = {configSave, configGet, getFilesGCP, getFilesAWS}