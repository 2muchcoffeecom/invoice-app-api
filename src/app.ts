import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import { Promise } from 'bluebird';

import setRouts from './routes';

// Load environment variables from .env file
dotenv.config();

// Create Express main
const app = express();

// Connect to MongoDB
(mongoose as any).Promise = Promise;

mongoose
  .connect(process.env.MONGODB_URI_LOCAL, {
    useNewUrlParser: true,
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

export default app;
