const introduction = require('../models/introduction/introduction')
class post {
    async index(req, res) {
      try{
        const posts =await introduction.find();
        res.status(200).json(posts)
      }catch(err){
        res.status(500).json({error:err})
      }
    }

  }
  
module.exports = new post();