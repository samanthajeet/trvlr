const bcrypt = require('bcryptjs')

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { username, password, email } = req.body;
    let takenEmail = await db.auth.check_email({email})
    takenEmail = takenEmail[0]
    if(takenEmail){
      return res.status(409).send('email taken')
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
  
  isLoggedIn: (req, res) => {
    const { user } = req.session;
    if(user) {
      res.status(200).send(user)
    } else {
      res.sendStatus(401)
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200)
  }
}