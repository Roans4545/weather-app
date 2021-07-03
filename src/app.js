const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forecast');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000
// it defines path of the directory 
let pathName = path.join(__dirname , '../public');
let viewPath = path.join(__dirname , '../templates/views');
let partialsPath = path.join(__dirname, '../templates/partials')
// it set the handelbar locations 
app.set('view engine', 'hbs');
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)

// it is static page thing 
app.use(express.static(pathName));

app.get('',(req,res)=>{
    res.render('index' , {
        title:'☁️Weather App☁️',
        name:'Made By:-👦Shah Het👦'
    })
})

app.get('/about',(req,res)=>{
    res.render('about' , {
        title:'🗺️About Page🗺️',
        name:'Made By:-👦Shah Het👦'
    })
})

app.get('/help',(req,res)=>{
    res.render('help' , {
        title:'💁🏻Help Page💁🏻',
        name:'Made By:-👦Shah Het👦'
    })
})

app.get('/weather' , (req , res)=>{
  if(!req.query.weather){
     return res.send({
          error: 'Please Provide Specific Information'
      })
  }
geocode(req.query.weather , (error , {latitude , longitude , location} = {})=>{
    if(error){
        return res.send({error})
    }

    forecast(latitude , longitude ,(error , forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.weather
        })
    })
})

    })

    

app.get('/help/*' , (req,res)=>{
    res.send('This Page Not found')
})

app.get('*',(req,res)=>{
    res.send('My 404 Page')
})

app.listen(port,()=>{
    console.log('server has started in port');
})