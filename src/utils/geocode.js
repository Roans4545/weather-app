const request = require('request')
const geocode = (address , callback)=>{
    let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hhaC1oZXQiLCJhIjoiY2twbmN1dXZpMm50NTJ3cmlibjBlcW5wNyJ9.j86mX2uiVldQ3SUKoVC6Yw';
    request({url , json: true} , (error , response)=>{
        if(error){
           callback('Please Check Your Internet' , undefined);
        }else if(response.body.features.length == 0){
            callback('Please Provide Correct Information' , undefined);
        }else{
            callback(undefined , {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1], 
                location: response.body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode