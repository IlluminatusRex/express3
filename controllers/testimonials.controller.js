const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.findOne().skip(rand);
    if (!testimonial) res.status(404).json({ message: 'Not found...' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne(req.params.id);
    if (testimonial) res.json(testimonial);
    else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.add = async (req, res) => {
  const { author, text } = req.body;
  try {
    const newTestimonial = new Testimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'Added' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  const { author, text } = req.body;
  try {
    const testimonial = await Testimonial.findOne(req.params.id);
    if (testimonial) {
      testimonial.author = author || testimonial.author;
      testimonial.text = text || testimonial.text;
      await testimonial.save();
      res.json({ message: 'updated', updated: testimonial });
    } else res.status(404).json({ messae: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const testimonial = await Testimonial.findOne(req.params.id);
    if (testimonial) {
      await Testimonial.deleteOne(testimonial);
      res.json({ message: 'Deleted', deleted: testimonial });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};