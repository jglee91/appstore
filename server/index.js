const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
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
app.use('/api/company', require('./routes/company'));

// middlewares
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(httpMiddleware.notFound);
app.use(httpMiddleware.errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));
