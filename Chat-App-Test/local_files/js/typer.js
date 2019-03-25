/* Modified from https://socket.io/get-started/chat */
$(function () {
  var socket = io();
  $('form').submit(function () {
    socket.emit('utterance', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('utterance', function (msg) {
    $('#messages').append($('<li>').text(msg));
  });

  $(".flow-buttons").find("button").click(function (e) {
    var txt = $(e.target).text();
    txt = $('#m').val()+" "+txt;
    $('#m').val(txt);
  });
});