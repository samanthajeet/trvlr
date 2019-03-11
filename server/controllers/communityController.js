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
  }
}