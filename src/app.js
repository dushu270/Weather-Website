const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('../utils/geocode')
const weather = require('../utils/weatherapi')
const chalk= require('chalk')


//console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//setting path for templates
const publicDirectory= path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//settig the template path
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('/',(req,res)=>{
    res.render('index',{title: "Weather",name: "Dushu"})
})


app.get('/help',(req,res)=>{
    res.render('help',{title:"Help",message:"Help",message:"This page is for help",name:"Dushu"})
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Dushu"
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"No location provided to search!"
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, place}={})=>{
        if(error){
            return res.send({error:error})
        }
        //console.log("Latitude: "+chalk.red(latitude)+" Longitute: "+chalk.green(longitude)+" place: "+ chalk.red(place))
    
        weather(latitude,longitude,(error,data)=>{
            if(error){
                return res.send({error:error})
            }
    
            return res.send({
                Forecast:data,
                Location:place,
                addressEntered:req.query.address
            })
        })
    })
})    

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404",
        message:"help page not found",
        name:"Dushu"
    })

})    


app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        message:"Page not found",
        name:"Dushu"
    })

})    

app.listen(port,()=>{
    console.log("Server Started")
})