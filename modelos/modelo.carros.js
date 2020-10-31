
const mongoose = require('mongoose');

/*Schema para la informacion de los carros*/
const carrosSchema = new mongoose.Schema(
  {
    marca:{type:String, trim:true, require:true},
    descripcion:{type:String,trim:true,require:true},
    modelo:{type:String, trim:true},
    motor:{type:String, trim:true, require:true},
    kilometraje:{type:String, trim:true, require:true},
    precio:{type:Number, trim:true, require:true},
    estado:{type:Boolean, require:true},
    cajaCambios:{type:String, trim:true, require:true},
    color:{type:String, trim:true, require:true},
    comentario:{type:String, trim:true},
    imagen:{data:Buffer, contentType:String}
  },
  {timestamps: true}
);

module.exports = mongoose.model("Carros",carrosSchema);
