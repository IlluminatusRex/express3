const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controller');

router.get('/', SeatController.getAll);

router.post('/', SeatController.add);

router.get('/:id', SeatController.getById);

router.put('/:id', SeatController.edit);

router.delete('/:id', SeatController.delete);

module.exports = router;