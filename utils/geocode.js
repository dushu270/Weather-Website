const request=require('request')

const geoCodeAPI=(address, callback)=>{
    const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHVibGljMjAyMSIsImEiOiJjbHNkZmltdXAwc3M0MmpsNXo1dmRrNXY3In0.4GaX79pxQQXUq00n9s79gA&limit=1'

    request({url:url2,json:true},(error, {body}={})=>{

        if(error){  
            callback('Unable to connect to service',undefined)
    
        }else if(body.features.length===0){
    
            callback("Unable to find the location. Try again!",undefined)
        }else{
            //console.log(body)
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
         
     
    })
}

module.exports= geoCodeAPI