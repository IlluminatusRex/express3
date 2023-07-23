const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/', ConcertController.getAll);
router.post('/', ConcertController.add);
router.get('/:id', ConcertController.getById);
router.put('/:id', ConcertController.edit);
router.delete('/:id', ConcertController.delete);

router.get('/performer/:performer', ConcertController.getByPerformer);
router.get('/genre/:genre', ConcertController.getByGenre);
router.get('/price/:price_min/:price_max', ConcertController.getByPrice);
router.get('/day/:day', ConcertController.getByDay);

module.exports = router;