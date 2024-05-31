import { find } from '../models/slider/slider.js';
class post {
    async index(req, res) {
      try{
        const posts =await find();
        res.status(200).json(posts)
      }catch(err){
        res.status(500).json({error:err})
      }
    }

  }
  
export default new post();