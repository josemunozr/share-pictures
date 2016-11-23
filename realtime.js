module.exports = function (server, sessionMiddleware) {
  var io = require("socket.io")(server);
  var redis = require("redis");
  var client = redis.createClient();

  client.subscribe("pictures");

  io.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  client.on("message", function (channel, message) {
    if(channel == "pictures"){
      console.log(message)
      io.emit("new picture", message);
    }
  })

  io.sockets.on("connection", function (socket){
    console.log(socket.request.session.user_id);
  });
}