const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { session } = req;
    const { username, password, email } = req.body;
    let takenEmail = await db.auth.check_email({email})
    takenEmail = +takenEmail[0].count
    console.log(takenEmail)
    if(takenEmail){
      return res.sendStatus(409)
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    let user = await db.auth.register({username, password:hash , email});
    user = user[0];
    res.status(200).send(session.user)
  },

  login: async (req, res) => {
    const db = req.app.get('db');
    const { email, password } = req.body;
    const { session } = req;
    let user = await db.auth.login({email});
    user = user[0];
    if(!user){
      return res.status(409).send('no account with that email')
    }
    let authenticated = bcrypt.compareSync(password, user.password)
    if(authenticated){
      delete user.password
      session.user = user
      res.status(200).send(session.user)
    } else {
      res.status(401).send('could not authenticate')
    }
  },
  
  isLoggedIn: async (req, res) => {
    const { user } = req.session;
    const {email} = req.session.user
    const db = req.app.get('db')
    if(user) {
      let userinfo = await db.auth.login({email})
      delete userinfo[0].password
      res.status(200).send(userinfo[0])
    } else {
      res.sendStatus(401)
    }
  },

  logout: (req, res) => {
    req.session.destroy(function(){
      res.sendStatus(200)
    });
  },

  updateUserInfo: async (req, res) => {
    const {user_id} = req.session.user
    const {user_image, username, city, country} = req.body
    const db = req.app.get('db')
    let updateUser = await db.auth.update_user({user_image, user_id, username, city, country})
    res.status(200).send(updateUser)

  }
}