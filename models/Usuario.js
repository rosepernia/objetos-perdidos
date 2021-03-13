const mongoose = require("mongoose")
const { Schema } = mongoose

const beautifyUnique = require('mongoose-beautiful-unique-validation')
const bcrypt = require('bcrypt')


const schemaUsuario = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    telefono: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'El email no puede estar vacío'],
        index: true,
        unique: 'El email ({VALUE}) ya existe',
        /* lowerCase: true, */
       /*  validate: [
            function (email) {
                return email == ""
            },
            'El email no puede estar vacío']  */
    },
    password: {
        type: String,
        required: [true, 'El password es necesario'],
        validate: [
            function (password) {
                return password.length >= 6
            },
            'El password debe tener al menos 6 caracteres']
    }
})

schemaUsuario.pre('save', function (next) {
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.password, salts).then(hash => {
            this.password = hash
            next()
        }).catch(error => next(error))
    }).catch(error => next(error))

})

class Usuario {

    //getter y los setter
    /*  get errores(){
         let errores=[]
         if(this.nombre=="")errores.push("El nombre no puede estar vacío")
         if(this.apellido=="")errores.push("El apellido no puede estar vacío")
         if(this.email=="")errores.push("El email no puede estar vacío")
     }
    */


    //sobreescribimos el setter de email para que si llega en mayúsculas lo pase a minúsculas:
    /*  set emailMal(email){
        this.email=email.toLowerCase()
     }
   */

   //métodos privados:

   comprobarPwd(password){
       //devuelve true si el pass coincide y false si no coincide
       return bcrypt.compare(password, this.password)
         .then(res=>{return res})
   }


}
schemaUsuario.plugin(beautifyUnique)
schemaUsuario.loadClass(Usuario)
module.exports = mongoose.model('Usuario', schemaUsuario)