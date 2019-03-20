require('dotenv').config()
const axios = require('axios')
const { OPEN_WEATHER_API } = process.env

module.exports = {
  getWeather: (req, res) => {
    const {user_city} = req.body
    console.log({user_city})
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user_city}&APPID=${OPEN_WEATHER_API}`).then(response => {
      console.log(response.data)
      res.status(200).send(response.data)
    }).catch(err => {
      console.log(err)
    })
  }
}