const express = require('express');
const mongoose = require('mongoose');
const config  = require('config');
const path = require('path');

const app = express();
const dbURL = config.get('mongoURL');
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Contact keeper app');
});

app.listen(port, () => {
  console.log(`App is running on port: ${port}.`);
});