const express = require('express');
const router = express.Router();
const db = require('./../db');
const shortid = require('shortid');

router.route('/').get((req, res) => {
  res.send(db.seats);
});

router.route('/').post((req, res) => {
  const id = shortid();
  const { day, seat, client, email } = req.body;
  if (db.seats.some((item) => item.day == day && item.seat == seat)) {
    res.send({ message: 'The slot is already taken!' });
    res.status(409).send({ message: 'The slot is already taken!' });
  } else {
    db.seats.push({ id, day, seat, client, email });
    req.io.emit('seatsUpdated', db.seats);

    res.send({ message: 'ok' });
  }
});

router.route('/:id').get((req, res) => {
  const idSelect = db.seats.find((item) => item.id === req.params.id);
  if (idSelect) {
    res.send(idSelect);
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

router.route('/:id').put((req, res) => {
  const idSelect = db.seats.find((item) => item.id === req.params.id);
  if (idSelect) {
    const { day, seat, client, email } = req.body;
    idSelect.day = day || idSelect.day;
    idSelect.seat = seat || idSelect.seat;
    idSelect.client = client || idSelect.client;
    idSelect.email = email || idSelect.email;
    res.send({ message: 'ok' });
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

router.route('/:id').delete((req, res) => {
  const idSelect = db.seats.findIndex((item) => item.id === req.params.id);
  console.log(idSelect);
  if (idSelect || idSelect === 0) {
    db.seats.splice(idSelect, 1);
    res.send({ message: 'ok' });
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

module.exports = router;