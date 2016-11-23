var socket = io();

socket.on("new picture", function(data){
  console.log(JSON.parse(data));
})