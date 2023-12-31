import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, loadSeatsRequest, loadSeats, getRequests } from '../../../redux/seatsRedux';
import './SeatChooser.scss';
import io from 'socket.io-client';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);

  const freeSeats = 50 - seats.filter((item) => item.day === chosenDay).length;

  const [socket, setSocket] = useState();

  useEffect(() => {
    const port = 'http://localhost:8000';
    const socket = io(port);
    setSocket(socket);
    dispatch(loadSeatsRequest(seats));
    socket.on('seatsUpdated', (seats) => {
      dispatch(loadSeats(seats));
    });
  }, [dispatch]);

  const isTaken = (seatId) => {
    return seats.some((item) => item.seat === seatId && item.day === chosenDay);
  };

  const prepareSeat = (seatId) => {
    if (seatId === chosenSeat)
      return (
        <Button key={seatId} className="seats__seat" color="primary">
          {seatId}
        </Button>
      );
    else if (isTaken(seatId))
      return (
        <Button key={seatId} className="seats__seat" disabled color="secondary">
          {seatId}
        </Button>
      );
    else
      return (
        <Button
          key={seatId}
          color="primary"
          className="seats__seat"
          outline
          onClick={(e) => {
            updateSeat(e, seatId);
            socket.emit('updateSeats'); // Emituj zdarzenie 'updateSeats' do serwera
          }}
        >
          {seatId}
        </Button>
      );
  };

  return (
    <div>
      <h3>Pick a seat</h3>
      <small id="pickHelp" className="form-text text-muted ml-2">
        <Button color="secondary" /> – seat is already taken
      </small>
      <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4">
        <Button outline color="primary" /> – it's empty
      </small>
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success && (
        <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i + 1))}</div>
      )}
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending && <Progress animated color="primary" value={50} />}
      {requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error && <Alert color="warning">Couldn't load seats...</Alert>}
      Free seats: {freeSeats}/50
    </div>
  );
};

export default SeatChooser;
