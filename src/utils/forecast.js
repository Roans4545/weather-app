const request = require('request');
const forecast = (lan , long , callback)=>{
    let url ='http://api.weatherstack.com/current?access_key=f29bb97abc4d167f6d03a75487a530c2&query='+ lan + ',' + long;
    
    request({url, json:true}, (error ,response )=>{
        if(error){
            callback('Please Check Your Internet' , undefined);
        }else if(response.body.error){
            callback('Please Provide Correct Information' , undefined);
        }else{
            const data = response.body.current;
            callback(undefined , 'Present Temperature: '+ data.temperature + '°c But  It Feels Like:' + data.feelslike + '°c');
        }
    })

} 

module.exports = forecast