
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Carros = require('../modelos/modelo.carros');
const {errorHandler} = require('../helpers/dberrorHandler');
const { normalize } = require('path');


//insercion de nuevo vehiculo
function nuevo(req,res){

  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "La imagen no pudo ser cargada"
      })
    }

    const { marca, descripcion, modelo, motor, kilometraje, precio, estado, cajaCambios, comentario } = fields
    let carros = new Carros(fields);

    if (files.imagen) {
      if (files.imagen.size > 1000000) {
        return res.status(400).json({
          error: "Esta imagen es muy pesada"
        })
      }
      carros.imagen.data = fs.readFileSync(files.imagen.path)
      carros.imagen.contentType = files.imagen.type
    }

    carros.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error)
        })
      }
      res.json({mensaje:"Informacion guardada"});
    })

  })

}


//Despliegue de datos de los vehiculos
function mostrar(req,res){

  let orden = req.query.order ? req.query.order : '-1';
  let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';

  Carros.find()
  .select("-imagen")
  .sort([[sortBy, orden]])
  .exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Informacion no encontrada"
      });
    }
    res.json(data);
  })

}

//funcion para desplegar los 10 vehiculos mas recientes
function mostrarRecientes(req,res){

  let orden = req.query.order ? req.query.order : '-1';
  let sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';

  Carros.find().limit(10)
  .select("-imagen")
  .sort([[sortBy, orden]])
  .exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Informacion no encontrada"
      });
    }
    res.json(data);
  })

}


//Funcion para desplegar los detalles de un vehiculo
function detallesVehiculo(req, res){
  req.carros.imagen = undefined;
  return res.json(req.carros);
}

//funcion para eliminar
function eliminar(req,res){
  let carros = req.carros;
  carros.remove((err,data) => {

    if (err) {
      return res.status(400).json({
        error:errorHandler(err)
      });
    }
    res.json({mensaje:"Informacion Eliminada"});

  })
}

// buscar y mostrar un vehiculo por su id
function mostrarCarrosById(req,res,next,id){
    Carros.findById(id).exec((err,carros) => {

      if (err || !carros) {
        return res.status(400).json({
          error:"Informacion no encontrada"
        });
      }
      req.carros = carros;
      next();

    });
}


// metodo para desplegar la imagen 
function mostrarImg(req, res, next){
  if (req.carros.imagen.data) {
    res.set('Content-Type', req.carros.imagen.contentType)
    return res.send(req.carros.imagen.data)
  }
  next();
}



module.exports = {
  nuevo,
  mostrar,
  mostrarRecientes,
  detallesVehiculo,
  eliminar,
  mostrarCarrosById,
  mostrarImg
}
