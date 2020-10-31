
const Usuario = require('../modelos/modelo.usuarios');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


/*Funcion para crear un nuevo usuario */
function nuevo(req, res){

  const user = new Usuario(req.body);
  user.save((error, user) => {
    
    if (error) {
      return res.status(400).json({
        error: "Error al crear el usuario, porfavor verifique sus datos"
      })
    }

    res.json({
      mensaje:`Usuario ${user.usuario} creado`
    });
    
  })

}


/*funcion para iniciar sesion */
function login(req, res){

  const {usuario, password} = req.body
  Usuario.findOne({usuario}, (error, user) => {

    if (error||!user) {
      return res.status(401).json({
        error: 'Este usuario no existe'
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error:'La contraseña es incorrecta'
      });
    }

    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
    res.cookie('t', token, {expire: false})
    const {_id, nombre, usuario} = user
    return  res.json({token, user:{_id, usuario, nombre}})

  });
  

}

// Funcion para cerrar sesion
function logout(req, res){
  res.clearCookie('t')
  res.json({mensaje:"Sesion finalizada"});
}


module.exports = {
    nuevo,
    login,
    logout
}