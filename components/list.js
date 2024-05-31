import list from '../models/listbanh/salted_egg_orchid.js';
class post {
    async index(req, res) {
      try{
        const posts =await list();
        res.status(200).json(posts)
      }catch(err){
        res.status(500).json({error:err})
      }
    }

}
  
export default new post();