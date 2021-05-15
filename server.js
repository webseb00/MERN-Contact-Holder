const express = require('express');
const mongoose = require('mongoose');
const config  = require('config');
const path = require('path');

const app = express();
const dbURL = process.env.mongoURL || config.get('mongoURL');
const port = process.env.PORT || 5000;

const user = require('./routes/user');
const auth = require('./routes/auth');
const contacts = require('./routes/contacts');

app.use(express.json());

// routes
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/contacts', contacts);

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Contact keeper app');
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}.`);
});