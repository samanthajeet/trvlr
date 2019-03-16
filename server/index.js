require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      pg = require('pg'),
      pgSession = require('connect-pg-simple')(session);


const app = express();
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env


var pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

app.use(express.json())
app.use(session({
  store: new pgSession({
    pool: pgPool,
    pruneSessionInterval: 60 * 60 * 24
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
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
app.put(`/auth/userInfo`,authCtrl.updateUserInfo)
app.get('/auth/isLoggedIn', authCtrl.isLoggedIn)


// JOURNAL ENDPOINTS
const journalCtrl = require('./controllers/journalController')
app.get('/journal/getAllCommunityPosts', journalCtrl.getAllCommunityPosts);
app.get('/journal/getUserPosts', journalCtrl.getUserPosts);
app.get(`/journal/searchTitle`, journalCtrl.searchAllPosts);
app.get(`/journal/:post_id`, journalCtrl.getPost);

app.put(`/journal/edit/:post_id`, journalCtrl.editPost)
app.post('/journal/createPost', journalCtrl.createPost);
app.delete('/journal/:post_id', journalCtrl.deletePost);

//COMMUNITY ENDPOINTS
const communityCtrl = require('./controllers/communityController')
app.get(`/community/getAllUsers`, communityCtrl.getAllUsers );
app.get(`/community/friendList/`, communityCtrl.getFriendList);
app.post(`/community/addfriend/`, communityCtrl.addFriend)

//PUBLIC ENDPOINTS
const publicCtrl = require('./controllers/publicController')
app.get(`/publicProfile/user/:user_id`, publicCtrl.getPublicProfile)
app.get(`/publicProfile/posts/:user_id`, publicCtrl.getPublicPosts)