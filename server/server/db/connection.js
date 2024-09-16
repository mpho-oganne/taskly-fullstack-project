
const mongoose = require("mongoose");

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_DATABASE} =
  process.env;

const mongoAtlas = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_DATABASE}.voiyh.mongodb.net/?retryWrites=true&w=majority&appName=${MONGODB_DATABASE}`;
const url = mongoAtlas;

const connectToDb = (cb) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      
      console.log('Successfully connected to MongoDB Atlas');
      return cb();
    })
    .catch(err => {
      console.error('Error connecting to MongoDB Atlas', err);
      return cb(err);
    });
};

const getDb = () => dbConnection;

module.exports = { connectToDb, getDb };