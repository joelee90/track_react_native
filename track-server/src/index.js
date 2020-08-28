const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const PW = process.env.PW;

const app = express();

app.use(authRoutes);

const mongoUri = `mongodb+srv://user:${PW}@cluster0.mckhz.mongodb.net/track?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to mongo', err);
});

app.get('/', (req, res) => {
  res.send('Hi');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
