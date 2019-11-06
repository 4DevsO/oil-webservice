const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const apiAuth = require('./middlewares/apiAuth');
const { catchAll, notFound } = require('./middlewares/error');

// set env variables from .env
dotenv.config();

// connect to mongodb
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const app = express();

// express middlewares
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add routes
app.use('/api/v1', apiAuth(), require('./controllers'));

// add errors middlewares
app.use(notFound);
app.use(catchAll);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`Service is running at http://localhost:${PORT}/api/v1`);
});
