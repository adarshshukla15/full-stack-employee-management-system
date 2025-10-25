const mongoose = require('mongoose')
require('dotenv').config();

const dbConnect =() => {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(()=> console.log('Database connected successfully'))
    .catch ((error) =>{
    console.error('Database connection failed:', error);
    process.exit(1);
  })
}

module.exports = dbConnect;