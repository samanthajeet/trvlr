module.exports = {

  getPublicProfile: async (req, res) => {
    try {
      const db = req.app.get('db');
      const {user_id} = req.params;
      let public_profile = await db.pub.get_public_profile({user_id})
      res.status(200).send(public_profile)
    } catch(err){
      console.log(err)
      res.status(500).send(err)
    }
  },

  getPublicPosts: async (req, res) => {
    try {
      const db = req.app.get('db');
      const {user_id} = req.params
      let public_posts = await db.journal.get_user_posts({user_id})
      res.status(200).send(public_posts)
    } catch(err){
      console.log(err)
      res.status(500).send(err)
    }
  }
}