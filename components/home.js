class post {
    async index(req, res) {
      try{
        req.rend('API')
      }catch(err){
        res.status(500)
      }
    }

}
  
export default new post();