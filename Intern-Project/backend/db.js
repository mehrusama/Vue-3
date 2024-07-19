

const mongoose = require('mongoose');
const uri = 'mongodb+srv://mongodb:mongodb%40123@cluster0.tgl1vzc.mongodb.net/library';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};
module.exports = connectDB;