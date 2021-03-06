 module.exports = {
   getAllCommunityPosts: async (req, res) => {
    const db = req.app.get('db')
    let communityPosts = await db.journal.get_all_community_posts();
    res.status(200).send(communityPosts)
   },
  
   getUserPosts: async (req, res) => {
     const db = req.app.get('db')
     const {user_id} = req.session.user
     let userPosts = await db.journal.get_user_posts({user_id})
     res.status(200).send(userPosts)
   },
   createPost: async (req,res) => {
     const db = req.app.get('db')
     const {user_id} = req.session.user
     const {post_title, post_text, post_image,post_city, post_country} = req.body
     let createPost = await db.journal.create_post({
       user_id,
       post_title,
       post_text,
       post_image,
       post_city,
       post_country})
     res.status(200).send(createPost)
   },
   getPost: (req, res) => {
    const db = req.app.get('db');
     const {post_id}  = req.params;

     db.journal.get_post({post_id}).then( post => {
       res.status(200).send(post[0])
     }).catch(err => {
       res.status(500).send(err)
     }) 
   },
   searchAllPosts: async (req, res) => {
     try{
      const db = req.app.get('db')
      let {search} = req.query;
      let searchResult  = await db.journal.search_by_title({search})
      res.status(200).send(searchResult)
     } catch(err) {
       console.log(err)
       res.status(500).send(err)
     }
   },

   deletePost: async (req, res) => {
     try {
       const db = req.app.get('db');
       const {post_id} = req.params;
       const {user_id} = req.session.user
       let response = await db.journal.delete_post({post_id, user_id})
       res.status(200).send(response)
     } catch(err){
        console.log(err)
        res.status(500).send(err)
     }
  },
  editPost: (req, res) => {
    try{
      const db = req.app.get('db');
      const {post_id} =req.params;
      const {post_title, post_text, post_image1} = req.body;
      let response = db.journal.edit_post({post_id, post_title, post_text, post_image1});
      res.status(200).send(response)
    } catch(err) {
      console.log(err)
      res.status(500).send(err)
    }
  }

 }