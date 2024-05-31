const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

async function accessory() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    name:{ type: String },
    number:{ type: Number },
    img:{ type: String },
    quantity:{ type: String },
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
  });

  console.log('Connected to MongoDB In-Memory server');
}

accessory().catch(err => {
  console.error('Failed to start server:', err);
});

module.exports= mongoose.model('accessory',accessory)