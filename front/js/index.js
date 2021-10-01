window.onload = function(){
    listGCP()
}

let home = document.getElementById("home")
let config = document.getElementById("config")
let list = document.getElementById("list")
let objects = document.getElementById("objects")
let settings = document.getElementById("settings")
let saveConfig = document.getElementById("save-config")
let credGCP = document.getElementById("cred-gcp")
let credAWS = document.getElementById("cred-aws")
let pathDownload = document.getElementById("path-download")
let gcp = document.getElementById("gcp")
let aws = document.getElementById("aws")
let modalConfig = document.getElementById("modal-config")
let upload = document.getElementById("upload")
let file = document.getElementById("file")
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
        getCred()

    }
})

gcp.addEventListener("click",(e)=>{
    objects.innerHTML = ''
    if(e.target.classList.contains("active")){
        aws.classList.remove("active")
        listGCP()
    }else{
        e.target.classList.add("active")
        aws.classList.remove("active")
        listGCP()
        
    }
})
aws.addEventListener("click",(e)=>{
    objects.innerHTML = ''
    if(e.target.classList.contains("active")){
        gcp.classList.remove("active")
    }else{
        e.target.classList.add("active")
        gcp.classList.remove("active")
        
    }
})

saveConfig.addEventListener("click", ()=>{
    data = {
        "cred-gcp": credGCP.value,
        "cred-aws": credAWS.value,
        "path-download": pathDownload.value,
        "key": "config-cred"
    }
    credGCP.value = ''
    credAWS.value = ''
    pathDownload.value = ''
    fetchServer("/cred/save",data)
    .then(result =>{
        credGCP.value = result["cred-gcp"]
        credAWS.value = result["cred-aws"]
        pathDownload.value = result["path-download"]
        modalConfig.classList.add("active")
        setTimeout(() => {
            modalConfig.classList.remove("active")
        }, 1000);
    })
    .catch(err => console.log(err))
})

upload.addEventListener("click", (e)=>{
    console.log(e.target)
    file.click()

})
file.addEventListener("change",async(e)=>{
    let formData = new FormData()
    formData.append("file",e.target.files[0])
    if(gcp.classList.contains("active")){
        await fetch("/gcp/upload",{
        method: "POST",
        body: formData
        })
        .then((r) => r.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }else if(aws.classList.contains("active")){
        await fetch("/aws/upload",{
        method: "POST",
        body: formData
        })
        .then((r) => r.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
    
})

function getCred(){
    fetchServer("/cred/get")
    .then(result =>{
        credGCP.value = result["cred-gcp"]
        credAWS.value = result["cred-aws"]
        pathDownload.value = result["path-download"]
    })
    .catch(err => console.log(err))
}
async function listGCP(){
    await fetch("/gcp/list",{
        method: "GET"
    })
    .then((r)=> r.json())
    .then((data) => {
        createItems(data)
    })
    .catch(err => console.log(err))
}

async function createItems(data){
    
    data.list.forEach((el)=>{
        
        let li = document.createElement("li")
        li.classList.add("docs")
        let ionIcon = document.createElement("ion-icon")
        ionIcon.setAttribute("name","document-outline")
        let span = document.createElement("span")
        span.innerHTML = el.split('-')[1]
        li.appendChild(ionIcon)
        li.appendChild(span)
        objects.appendChild(li)
    })
}

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