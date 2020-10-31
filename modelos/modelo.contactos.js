
const mongoose = require('mongoose');
/*Schema para la informacion de los contactos*/

const contactosSchema = new mongoose.Schema(
  {
    nombre:{type:String,require:true},
    correo:{type:String},
    telefono:{type:String,require:true},
    estado:{type:Boolean, require:true},
    comentario:{type:String,require:true}
  },
  {timestamps:true}
)

module.exports = mongoose.model("Contactos",contactosSchema);
