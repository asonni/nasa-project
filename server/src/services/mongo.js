const mongoose = require('mongoose');

// This for Running API Tests With Dotenv
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.set('strictQuery', true);

mongoose.connection.once('open', () => {
  console.info('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};

const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisconnect
};
