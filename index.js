const express = require('express');
const app = express();
const SerialPort = require('serialport');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());

server.listen(3000, function () {
  console.log('listening on port 3000!');
});

app.get('/test', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static('public'));

const sport = new SerialPort('COM4', () => {
  console.log('SerialPort Opened');
});

var connectedSocket = null;
function onConnection(socket){
    connectedSocket = socket;
}
io.on('connection', onConnection);

server.on("connection", (socket) => {
  console.log(`Client connected`);
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
  io.emit('data', { data: data });
  console.log(i);
  });

