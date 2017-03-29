var socket = io();

$(document).ready(function () {
    var name = makeid();
    $("#user").val(name);
    socket.emit('chat message', 'System', '<b>' + name + '</b> has joined the discussion');

    $("#m").unbind("keyup");
    $("#m").bind("keyup", function() {
        socket.emit("notify user", name);
    });
});

function makeid() {
    var length = 5;
    var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array(length).join().split(',').map(function() { return possible.charAt(Math.floor(Math.random() * possible.length)); }).join('');
};

$("form").submit(function () {
    var from = $("#user").val();
    var message = $("#m").val();
    socket.emit("chat message", from, message);
    $("#m").val("");
    return false;
});

socket.on("chat message", function (from, msg) {
    var me = $("#user").val();
    var color = "#009afd";
    if(from == me) {
        color = "green";
        from = "Me";
    }
    $("#messages").append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});

socket.on("notify user", function(user) {
    var me = $("#user").val();
    if(me != user) {
        $("#notify-user").text(user + " is typing...");
    }
    setTimeout(function() { 
        $("#notify-user").text(""); 
    }, 3000);
});