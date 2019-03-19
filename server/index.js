require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      pg = require('pg'),
      pgSession = require('connect-pg-simple')(session);
      aws = require('aws-sdk')


const app = express();
const { SERVER_PORT,
        CONNECTION_STRING,
        SESSION_SECRET,
        S3_BUCKET,
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY
      } = process.env


var pgPool = new pg.Pool({
  connectionString: CONNECTION_STRING
})
app.get('/api/signs3', (req, res) => {
  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };

  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };

    return res.send(returnData);
  });
});


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
app.get(`/community/friendPosts`, communityCtrl.friendPosts);
app.get(`/community/likePost/checkLikes/:post_id`, communityCtrl.checkLikes)

app.post(`/community/addfriend/`, communityCtrl.addFriend);
app.post(`/community/likePost/:post_id`, communityCtrl.likePost)


//PUBLIC ENDPOINTS
const publicCtrl = require('./controllers/publicController')
app.get(`/publicProfile/user/:user_id`, publicCtrl.getPublicProfile)
app.get(`/publicProfile/posts/:user_id`, publicCtrl.getPublicPosts)

//TEST ENDPOINTS
const testCtrl = require('./controllers/testController')
app.post(`/test/createPost`, testCtrl.createPost)