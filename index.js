const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: '.' });
});

io.on("connection", function(socket) {
  console.log("a user connected!");
  io.on("connection", function(socket) {
    io.emit("user connected!");
  });
  
  socket.on('disconnect', function() {
    console.log("a user disconnected :(");
  });
});

// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

// To send message to everyone but connecting socket
// io.on('connection', function(socket){
//   socket.broadcast.emit('hi! :)');
// });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    // console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log("listening on http://localhost:3000!");
});