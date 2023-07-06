const express = require('express');
const router = express.Router();
const db = require('./../db');
const shortid = require('shortid');

router.route('/').get((req, res) => {
  res.send(db.concerts);
});

router.route('/').post((req, res) => {
  const id = shortid();
  const { performer, genre, price, day, image } = req.body;
  db.concerts.push({ id, performer, genre, price, day, image });
  res.send({ message: 'ok' });
});

router.route('/:id').get((req, res) => {
  const idSelect = db.concerts.find((item) => item.id === req.params.id);
  if (idSelect) {
    res.send(idSelect);
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

router.route('/:id').put((req, res) => {
  const idSelect = db.concerts.find((item) => item.id === req.params.id);
  if (idSelect) {
    const { performer, genre, price, day, image } = req.body;
    idSelect.performer = performer || idSelect.performer;
    idSelect.genre = genre || idSelect.genre;
    idSelect.price = price || idSelect.price;
    idSelect.day = day || idSelect.day;
    idSelect.image = image || idSelect.image;
    res.send({ message: 'ok' });
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

router.route('/:id').delete((req, res) => {
  const idSelect = db.concerts.findIndex((item) => item.id === req.params.id);
  console.log(idSelect);
  if (idSelect || idSelect === 0) {
    db.concerts.splice(idSelect, 1);
    res.send({ message: 'ok' });
  } else {
    res.status(404).send({ message: 'Not found...' });
  }
});

module.exports = router;