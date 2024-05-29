const accssory = require('../models/saccessory/accessory')

class post {
    async index(req, res) {
      try{
        const posts =await accssory.find();
        res.status(200).json(posts)
      }catch(err){
        res.status(500).json({error:err})
      }
    }

  }
  
module.exports = new post();