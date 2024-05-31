const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

async function detailcake() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    name:{type: String},
    moneybysize:[
       { 
        money:{ type: Number },
        size:{ type: String },
        }
    ],
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
  });

  console.log('Connected to MongoDB In-Memory server');
}

detailcake().catch(err => {
  console.error('Failed to start server:', err);
});

module.exports= mongoose.model('detailcake',detailcake)