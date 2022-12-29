const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
PublicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(PublicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bartje'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'about me',
        name: 'Bartjetje'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'help me',
        message: 'mim ajuda carai',
        name: 'bartje'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({ error: 'You must provide an address' })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        weather(latitude, longitude, (error, result) => {
            if (error){ return res.send({error}) }
            res.send({
                forecast: result,
                location,
                input: req.query.address
            })
        })
    })
})


app.get('/Products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bartje',
        errorMessage: 'help não encontrado'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bartje',
        errorMessage: 'errou malandro'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

