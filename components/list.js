const salted_egg_orchid = require('../models/listbanh/salted_egg_orchid')
class post {
    async index(req, res) {
      try{
        const posts =await salted_egg_orchid.find();
        res.status(200).json(posts)
      }catch(err){
        res.status(500).json({error:err})
      }
    }

  }
  
module.exports = new post();