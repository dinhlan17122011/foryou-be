import list from '../models/listbanh/salted_egg_orchid.js';
class post {
    async index(req, res) {
      try{
        // const posts =await list.find();
        const posts = new list(req.body)
        const svepost = await posts.save()
        res.status(200).json(svepost)
        // res.status(200).json(posts)
        // res.status(200).json(req.body)

      }catch(err){
        res.status(500).json({error:err})
      }
    }

}
  
export default new post();