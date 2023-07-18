const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/', TestimonialController.getAll);

router.get('/random', TestimonialController.getRandom);

router.post('/', TestimonialController.add);

router.get('/:id', TestimonialController.getById);

router.put('/:id', TestimonialController.edit);

router.delete('/:id', TestimonialController.delete);
module.exports = router;