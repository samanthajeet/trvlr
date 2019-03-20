module.exports = {
  getUserLocation: async (req, res) => {
    try{
      const db = req.app.get('db')
      const {user_id} = req.session.user
      let response = await db.location.get_location({user_id})
      res.status(200).send(response)
    } catch(err) {
      console.log(err)
      res.status(500).send(err)
    }

  }
}