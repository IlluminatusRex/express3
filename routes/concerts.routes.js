const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/', ConcertController.getAll);

router.post('/', ConcertController.add);

router.get('/:id', ConcertController.getById);

router.put('/:id', ConcertController.edit);

router.delete('/:id', ConcertController.delete);

module.exports = router;