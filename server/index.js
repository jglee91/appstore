const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const httpMiddleware = require('./middlewares/http');
const config = require('./config');
require('dotenv').config();

const app = express();
const port = config.PORT;

// settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('common'));
app.use(cookieParser());

// routers
app.use('/api/user', require('./routes/user'));
app.use('/api/company', require('./routes/company'));
// app.use('/api/project', require('./routes/project'));
// app.use('/api/application', require('./routes/application'));

// middlewares
mongoose.connect(config.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(httpMiddleware.notFound);
app.use(httpMiddleware.errorHandler);
app.use(passport.initialize());
require('./middlewares/passport')();

app.listen(port, () => console.log(`Listening on port ${port}`));
