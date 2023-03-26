var openMobileMenu = document.getElementById('open-menu');
var closeMobileMenu = document.getElementById('close-menu');
var header = document.getElementById('header');

openMobileMenu.addEventListener('click', ()=>{
    header.style.display = 'block';
    header.style.transition = 'all 0.8s';
})

closeMobileMenu.addEventListener('click', ()=>{
    header.style.display = 'none'
})

const buttonSubmit = document.getElementById('submit');

buttonSubmit.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value,
          textComment = document.getElementById('text-comment').value;

    
    fetch('http:localhost:3000/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, textComment})
    }).then(response => {
        return response.json()
    }).then(msg => {
        console.log('Message: ' + msg);
    })
})