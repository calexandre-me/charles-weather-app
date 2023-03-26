const buttons = document.getElementsByClassName("button");

for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", ()=>{
        buttons[i].nextElementSibling.classList.toggle("show-fix");
    })
}
