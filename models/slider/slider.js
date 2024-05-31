const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

async function slider() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    img:{ type: String },
    nameimg:{ type: String },
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
  });

  console.log('Connected to MongoDB In-Memory server');
}

slider().catch(err => {
  console.error('Failed to start server:', err);
});

module.exports= mongoose.model('slider',slider)