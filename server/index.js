require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive')


const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000000000
  }
}))


massive(CONNECTION_STRING).then( db => {
  app.set('db', db);
  app.listen( SERVER_PORT, () => {console.log(`Bingpot on ${SERVER_PORT}`)})
})



// AUTH ENDPOINTS
const authCtrl = require('./controllers/authController')
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.post('/auth/logout', authCtrl.logout)
app.get('/auth/isLoggedIn', authCtrl.isLoggedIn)