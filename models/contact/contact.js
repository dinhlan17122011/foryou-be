const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

async function contact() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    information:[
        {
            consultinghotline:{type:Number},
            complainthotline:{type:Number},
            email:{type:String}
        }
    ],
    link:[
        {
            facebook:{type:String},
            tiktok:{type:String}
        }
    ],
    createdAt: { type: Date , default:Date.now },
    updatedAt: { type: Date , default:Date.now },
  });

  console.log('Connected to MongoDB In-Memory server');
}

contact().catch(err => {
  console.error('Failed to start server:', err);
});

module.exports= mongoose.model('contact',contact)