let form = document.querySelector('.submit');
let search = document.querySelector('.input');
let loc = document.querySelector('.loc');
let temp = document.querySelector('.temp');
form.addEventListener('click' , (e)=>{
    e.preventDefault()

    const location = search.value

    loc.innerHTML = 'Loading...';
    temp.innerHTML = ''
    fetch('http://localhost:3000/weather?weather=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
               loc.innerHTML = data.error
               temp.innerHTML = ''
            }else{
                loc.innerHTML = data.location
                temp.innerHTML = data.forecast
            }
        })
        })
})