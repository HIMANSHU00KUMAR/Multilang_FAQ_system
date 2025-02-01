const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const faqRoutes = require('./src/routes/faqRoute');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
// Middleware
app.use(helmet());
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/faqs', faqRoutes);



app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

module.exports = app;