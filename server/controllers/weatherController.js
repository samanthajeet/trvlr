require('dotenv').config()
const axios = require('axios')
const { OPEN_WEATHER_API } = process.env

module.exports = {
  getWeather: (req, res) => {
    const {city} = req.params

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${OPEN_WEATHER_API}`).then(response => {
      res.status(200).send(response.data)
    }).catch(err => {
      console.log(err)
    })
  }
}