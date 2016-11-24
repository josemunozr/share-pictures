var socket = io();

socket.on("picture:new", function(data){

  var container = document.querySelector("#pictures");
  var source = document.querySelector("#tpl-pictures").innerHTML;

  var tpl = Handlebars.compile(source);

  container.innerHTML = tpl(JSON.parse(data)) + container.innerHTML;
})