let home = document.getElementById("home")
let config = document.getElementById("config")
let list = document.getElementById("list")
let settings = document.getElementById("settings")
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
