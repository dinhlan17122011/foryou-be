const slider = require('../models/slider/slider')
class post {
    async index(req, res) {
      try{
        const posts =await slider.find();
        res.status(200).json(posts)
      }catch(err){
        res.status(500).json({error:err})
      }
    }

  }
  
module.exports = new post();