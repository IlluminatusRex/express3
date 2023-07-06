const express = require('express');
const shortid = require('shortid');
const db = require('./db');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/seats', seatsRoutes);

app.use((req, res) => {
  res.status(404).send('404 not found...');
});


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});