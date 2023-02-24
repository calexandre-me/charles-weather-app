
const buttons = document.getElementsByClassName("button");

console.log(typeof(buttons));

for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", ()=>{
        // if(buttons[i].nextElementSibling.style.display == "none"){
        //     buttons[i].nextElementSibling.style.display = "block";
        // }
        // else{
        //     buttons[i].nextElementSibling.style.display = 'none';
        // }
        
        buttons[i].nextElementSibling.classList.toggle("show-fix");
    })
}

// buttons.forEach((button )=> {
//     button.addEventListener("click", ()=>{
//         console.log("hi");
//     })
// });
