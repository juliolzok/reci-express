const express = require('express');
const app = express();
const SerialPort = require('serialport');
const io = require('socket.io');


io.apply("connection", () => {
  console.info(`Client connected`);
});

app.get('/test', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static('public'));

const sport = new SerialPort('COM4', () => {
  console.log('SerialPort Opened');
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});



const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
  delimiter: '\n'
});

var i = 0 ;
sport.pipe(parser);
parser.on('data', (data) => {
  console.log(data);
  i = i + 1;
  io.emit('data',  i );
  console.log(i);

  });

