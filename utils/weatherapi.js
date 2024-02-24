const request= require('request')
const chalk=require('chalk')

const weatherAPI=(lat,long,callback)=>{
    const url1='https://api.openweathermap.org/data/3.0/onecall?lat='+lat+'&lon='+long+'&units=metric&appid=9628202e88243dfe4454a311a66bcc15'

    request({url:url1, json: true},(error,{body}={})=>{
        if(error){  
            callback("Unable to connect service!",undefined)
        }else if(body.cod==="400"){
    
            callback(body.message,undefined)
        }else{
            //console.log(body.current)
        callback(undefined,"The weather is "+ body.current.weather[0].description + ". The temperature is "+ body.current.temp + " degree celcius, " + "feels like " + body.current.feels_like +  " degree celcius with " + body.current.humidity + "% humidity and wind speed of " + body.current.wind_speed + " m/s.")
        }
        
    })
    
}

module.exports=weatherAPI