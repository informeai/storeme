let home = document.getElementById("home")
let config = document.getElementById("config")
let list = document.getElementById("list")
let settings = document.getElementById("settings")
let saveConfig = document.getElementById("save-config")
let credGCP = document.getElementById("cred-gcp")
let credAWS = document.getElementById("cred-aws")
let gcp = document.getElementById("gcp")
let aws = document.getElementById("aws")
home.addEventListener("click",(e)=>{
    if(e.target.classList.contains("active")){
        e.target.classList.remove("active")
        config.classList.add("active")
    }else{
        e.target.classList.add("active")
        config.classList.remove("active")
        list.style.display = "flex"
        settings.style.display = "none"
    }
})
config.addEventListener("click",(e)=>{
    if(e.target.classList.contains("active")){
        e.target.classList.remove("active")
        home.classList.add("active")
    }else{
        e.target.classList.add("active")
        home.classList.remove("active")
        list.style.display = "none"
        settings.style.display = "flex"

    }
})

gcp.addEventListener("click",(e)=>{
    if(e.target.classList.contains("active")){
        e.target.classList.remove("active")
        aws.classList.add("active")
    }else{
        e.target.classList.add("active")
        aws.classList.remove("active")
        
    }
})
aws.addEventListener("click",(e)=>{
    if(e.target.classList.contains("active")){
        e.target.classList.remove("active")
        gcp.classList.add("active")
    }else{
        e.target.classList.add("active")
        gcp.classList.remove("active")
        
    }
})

saveConfig.addEventListener("click", ()=>{
    data = {
        "cred-gcp": credGCP.value,
        "cred-aws": credAWS.value,
        "key": "config-cred"
    }
    credGCP.value = ''
    credAWS.value = ''
    fetchServer("/cred/save",data)
    .then(result =>{
        credGCP.value = result["cred-gcp"]
        credAWS.value = result["cred-aws"]
        alert("salvo")
    })
    .catch(err => console.log(err))
})


//fetching
async function fetchServer (url="", data={}){
    const result = await fetch(url, {
        method: "POST",
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data)
    });
    return result.json();
}