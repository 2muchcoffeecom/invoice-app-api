import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { Promise } from 'bluebird';
import errorHandler from 'errorhandler';

import setRouts from './routes';
import { handleError } from './utils/error-hadler/handle-error';

// Load environment variables from .env file
dotenv.config();

// Create Express main
const app = express();

// Connect to MongoDB
(mongoose as any).Promise = Promise;

mongoose
  .connect(process.env.MONGODB_URI_LOCAL, {
    useNewUrlParser: true,
    // TODO: revise the use of the properties of useCreateIndex and useFindAndModify
    // Set to true to make Mongoose's default index build use createIndex() instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver.
    useCreateIndex: true,
    // Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
    useFindAndModify: false
  } as mongoose.ConnectionOptions)
  .then(() => {
    console.log(`Connected to ${process.env.MONGODB_URI_LOCAL}`);
  })
  .catch(() => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running.',
    );
    // process.exit();
  });

// Express configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }),
);

setRouts(app);

if (process.env.PRODUCTION_MODE) {
  app.use(errorHandler());
}

app.use(handleError);

export default app;
