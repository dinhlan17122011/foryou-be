const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

async function policy() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    title:{type:String},
    titlelink:{type:String},
    img:{type:String},
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
  });

  console.log('Connected to MongoDB In-Memory server');
}

policy().catch(err => {
  console.error('Failed to start server:', err);
});

module.exports= mongoose.model('policy',policy)