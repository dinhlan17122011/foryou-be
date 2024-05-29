// const detailcake = require('../models/detailcake/detailcake')
const list = require('../models/listbanh/salted_egg_orchid')
const detailcake = require('../models/detailcake/detailcake')
const id =['664c8e6ebc300b229fcd3fb0','66486db58cc1a442de62368d','664870c98cc1a442de623694',
          '664871e48cc1a442de623698','664873ec8cc1a442de62369a','664874a78cc1a442de62369c',
          '664875a78cc1a442de62369d','664875f48cc1a442de6236a0', null
]

class post {
  async index(req, res) {
    try{
      const posts =await detailcake.findById(id[1]);
      res.status(200).json([posts])
    }catch(err){
      res.status(500).json({error:err})
    }
  }
  async index1(req, res) {
    try{
      const posts =await detailcake.findById(id[2]);
      res.status(200).json([posts])
    }catch(err){
      res.status(500).json({error:err})
    }
  }
  async index2(req, res) {
    try{
      const posts =await detailcake.findById(id[3]);
      res.status(200).json([posts])
    }catch(err){
      res.status(500).json({error:err})
    }
  }
  async index3(req, res) {
    try{
      const posts =await detailcake.findById(id[4]);
      res.status(200).json([posts])
    }catch(err){
      res.status(500).json({error:err})
    }
  }
  async index4(req, res) {
    try{
      const posts =await detailcake.findById(id[5]);
      res.status(200).json([posts])
    }catch(err){
      res.status(500).json({error:err})
    }
  }
  async index5(req, res) {
    try{
      const posts =await detailcake.findById(id[6]);
      res.status(200).json([posts])
    }catch(err){
      res.status(500).json({error:err})
    }
  }
  async index6(req, res) {
    try{
      const posts =await detailcake.findById(id[7]);
      res.status(200).json([posts])
    }catch(err){
      res.status(500).json({error:err})
    }
  }
  async index7(req, res) {
    try{
      const posts =await detailcake.findById('664875a78cc1a442de62369d');
      res.status(200).json([posts])
    }catch(err){
      res.status(500).json({error:err})
    }
  }
  async index8(req, res) {
    try{
      const posts =await detailcake.findById('664875a78cc1a442de62369d');
      res.status(200).json([posts])
    }catch(err){
      res.status(500).json({error:err})
    }
  }
  }
  
module.exports = new post();