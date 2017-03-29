var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get('/', function(req, res){
  res.render("index");
});

io.on("connection", function(socket) {
    console.log("A user connected");

    socket.on("chat message", function(from, msg) {
        io.emit("chat message", from, msg);
    });

    socket.on("notify user", function(user) {
        io.emit("notify user", user);
    });

    socket.on("disconnect", function() {
        console.log("A user disconnected");
    })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

require('./config')(app);