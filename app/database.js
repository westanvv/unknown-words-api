import mongoose from 'mongoose';
import Promise from 'bluebird';
import Constants from './config/constants';

// Use native promises
mongoose.Promise = Promise;

// Connect to our mongo database;
mongoose.connect(Constants.mongo.uri, { useMongoClient: true });

mongoose.connection.on('error', (err) => {
  throw err;
});
