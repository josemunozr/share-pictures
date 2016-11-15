module.exports = function (picture, req, res) {
  // true = tiene permisos
  // false = no tiene permisos

  // si es una consulta pero no es para editar
  if(req.method == "GET" && req.path.indexOf("edit") < 0 ) { return true; }

  // si creador de imagen es el mismo que el usuario que esta logeado
  if(picture.creator._id.toString() == res.locals.user._id){ return true; }

  return false;
}