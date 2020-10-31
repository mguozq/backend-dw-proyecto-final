
const Contactos = require('../modelos/modelo.contactos');
const {errorHandler} = require('../helpers/dberrorHandler');


/*insercion de un nuevo contacto*/
function nuevo(req,res){

  const contactos = new Contactos(req.body);
  contactos.save((err,data) => {

    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }else {
      res.json({mensaje:"Informacion Enviada"});
    }

  });

}


/*Despligue de la informacion de contactos*/
function mostrar(req,res){

  Contactos.find().exec((err,data) => {

    if (err) {
      return res.status(400).json({
        error:errorHandler(err)
      });
    }else {
      res.json(data);
    }

  });

}


/*Funcion para eliminar un contacto*/
function eliminar(req,res){

  let contactos = req.contactos;
  contactos.remove((err,data) => {

    if (err) {
      return res.status(400).json({
        error:errorHandler(err)
      });
    }
    res.json({mensaje:"Informacion Eliminada"});

  })

}


function contactosById(req,res,next,id){
    Contactos.findById(id).exec((err,contactos) => {

      if (err || !contactos) {
        return res.status(400).json({
          error:"Informacion no encontrada"
        });
      }
      req.contactos = contactos;
      next();

    });
}

module.exports = {
  nuevo,
  mostrar,
  eliminar,
  contactosById
};
