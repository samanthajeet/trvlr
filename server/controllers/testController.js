module.exports = {
  createPost: async (req, res) =>{
    const db = req.app.get('db')
    const {test_text} = req.body;
    console.log({test_text})
    let createPost = await db.test.test({test_text})
    res.status(500).send(createPost)
  }
}