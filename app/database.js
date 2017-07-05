import mongoose from 'mongoose';
import Promise from 'bluebird';
import util from 'util';
import getLogger from './lib/logger';
import Constants from './config/constants';

const logger = getLogger(module);

// Use native promises
mongoose.Promise = Promise;

const dbUrl = Constants.mongo.uri;
const dbParams = {
  useMongoClient: true,
};

// Connect to our mongo database;
mongoose.connect(dbUrl, dbParams);

const connection = mongoose.connection;

if (Constants.envs.development) {
  connection.on('connected', () => {
    logger.info(`Mongoose connected to ${dbUrl}`);
  });

  connection.on('disconnected', () => {
    logger.info(`Mongoose disconnected from ${dbUrl}`);
  });

  mongoose.set('debug', (collectionName, method, query, doc) => {
    logger.log('debug', `${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });

  process.on('SIGNINT', () => {
    connection.close(() => {
      logger.info(`Mongoose connection closed through app termination`);
      process.exit(0);
    });
  });
}

connection.on('error', (err) => {
  if (err instanceof Error) throw err;
  throw new Error(`Unable connect to database: ${dbUrl}`);
});
