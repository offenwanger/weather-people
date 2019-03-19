var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/local_files/index.html');
});

app.get('/typer', function (req, res) {
  res.sendFile(__dirname + '/local_files/typer.html');
});

app.use('/', express.static(__dirname + '/local_files'));

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
});

http.listen(port, function () {
  console.log('listening on *:' + port);
});
