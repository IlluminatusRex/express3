const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found...' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.add = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
    await newSeat.save();
    res.json({ message: 'Added' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = await Seat.findById(req.params.id);
    if (newSeat) {
      newSeat.day = day;
      newSeat.seat = seat;
      newSeat.client = client;
      newSeat.email = email;
      await newSeat.save();
      res.json({ message: 'Updated', updated: newSeat });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne(seat);
      res.json({ message: 'Deleted', deleted: seat });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};