module.exports = {
  getAllUsers: async(req, res) => {
    try {
      const db = req.app.get('db')
      let response = await db.community.get_all_users();
      res.status(200).send(response)
    } catch(err){
      console.log(err)
      res.status(500).send(err)
    }
  },
  getFriendList: async(req,res) => {
    try {
      const db = req.app.get('db')
      const {user_id} = req.session.user
      let response = await db.community.get_friend_list({user_id})
      res.status(200).send(response)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  },

  addFriend: async(req, res) => {
    try {
      const db = req.app.get('db');
      const {user_id} = req.session.user;
      const {friend_id} = req.body
      let response = await db.community.add_friend({user_id, friend_id})
      console.log('added', {friend_id})
      res.status(200).send(response)
    } catch(err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
}