
const mongoose = require('mongoose');
const crypto =  require('crypto');
const uuidv1 = require('uuid/V1');

const usuariosSchema = new mongoose.Schema({
    nombre:{type:String, trim:true,require:true},
    usuario:{type:String, trim:true, require:true,unique: true},
    hashed_password:{type:String,require:true},
    salt: String
},
{timestamps:true});




//encriptacion
usuariosSchema.virtual('password')
.set(function(password) {
  this._password = password;
  this.salt = uuidv1();
  this.hashed_password = this.encryptPassword(password);
})
.get(function() {
  return this._password;
});



usuariosSchema.methods = {

  //autenticacion
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  // funcion de encriptacion
  encryptPassword: function(password) {
    if(!password) return '';
    try {
      return crypto.createHmac('sha1',this.salt)
      .update(password)
      .digest('hex')
    } catch (err) {
      return "";
    }
  }

  
};


module.exports = mongoose.model('Usuarios', usuariosSchema);