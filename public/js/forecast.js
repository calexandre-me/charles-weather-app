console.log('Hi this is forecast.');

const searchWeather = document.querySelector("form");
const [table] = document.getElementsByClassName("table-resume");   


table.addEventListener('click', (e)=>{
    if(e.target.classList.contains('table-resume')){
        table.style.display = 'none';
    }
})

searchWeather.addEventListener("submit", (event) => {
    event.preventDefault();

    const userTarget = document.getElementById("target-location").value;   
    fetch(`/secure-1234-weather-info-api-get-info?address=${userTarget}`).then(response=>{
        response.json().then(data=>{
console.log(data);

        const [serverMessageBox] = document.getElementsByClassName('server-message');
        const serverMessage = document.getElementById('message');  
        const txtResume = document.getElementById('txt-resume');      
        const [tableWeather] = document.getElementsByClassName('table-resume');
            if(!data.error){
                if(tableWeather.classList.contains('hide')){
                    tableWeather.classList.remove('hide')
                }
                if(!serverMessageBox.classList.contains('hide')){
                    serverMessageBox.classList.add('hide');
                }

                //get the results
                const results = Object.values(data);
                console.log(results);
                
                const resultFields = document.getElementsByClassName("result");
    
                results.forEach((value, index) => {
                    resultFields[index].style.fontWeight = 'bold';
                    resultFields[index].textContent = value;
                });

                txtResume.textContent = `${userTarget} is ${results[0]}`; 
                
                table.style.display = 'block';
            }
            else{
                if(!tableWeather.classList.contains('hide')){
                    tableWeather.classList.add('hide')
                }
                
                if(serverMessageBox.classList.contains('hide')){
                    serverMessageBox.classList.remove('hide');
                }
                serverMessage.style.fontWeight = 'bold';
                serverMessage.textContent = data.error;
            }

        })
    })

    
});
