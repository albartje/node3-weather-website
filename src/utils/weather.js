const request = require('request')

const weather = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=48f5a331dae7fc2be57c7ac9c788cccb&query=' + latitude + "," + longitude

    request({url, json: true}, (error, { body }) => {
        console.log(url)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+'. it is currently ' + body.current.temperature + ' degrees. It feels like '+ body.current.feelslike+" degrees out. The wind speed is "+ body.current.wind_speed + " kilometers per hour.")
    }
    })
}

module.exports = weather