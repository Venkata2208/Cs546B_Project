
const mongoose = require('mongoose');
const { mongoURL} = require('../config/default.json');

module.exports = function connect() {
  
    const options = { 
        useNewUrlParser: true,
        keepAlive: true,
        connectTimeoutMS: 5000,
        maxPoolSize: 50,
    };
    
    // Initial connection
    mongoose.connect(mongoURL, options)
        .then(
            () => console.log(`Connected to DB`))
        .catch((ex) => {
            console.log('Failed to connect DB');
        process.exit(0);
      });
  
    // Handling errors
    mongoose.connection.on('error', (err) => {
      console.log(err);
    });
  
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB connection disconnected');
    });
  
    mongoose.connection.on('reconnected', function() {
      console.log('mongodb reconnected');
    });
  };
  