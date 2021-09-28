const {saveConfig, getConfig, updateConfig, verifyConfig} = require("./database")

async function configSave(data){
    let resp = {}

    await verifyConfig()
    .then((count)=>{
        console.log(count)
        if(count == 0){
            //saveConfig
        }else{
            //updateConfig
        }
    })
    .catch(err => console.log(err))

    //await getConfig
}

module.exports = {configSave}