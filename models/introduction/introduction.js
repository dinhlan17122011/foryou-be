const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

async function introduction() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    name:{ type: String },
    describe:{ type: String },
    introductionmainf:[
        {
            img:{type:String},
            describemainf:{type:String}
        }
    ],
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
  });

  console.log('Connected to MongoDB In-Memory server');
}

introduction().catch(err => {
  console.error('Failed to start server:', err);
});

module.exports= mongoose.model('introduction',introduction)