const mongoose = require("mongoose")
const {Schema} = mongoose

const schemaObjeto = new Schema({
    /* nombre: {type:String, required: true},
    telefono: {type:String, required:true}, */
    titulo:{type:String, uppercase: true},
    fecha:{type:String},
    localizacion:{type:String},
    descripcion:{type:String},
    foto:{type:String,default:'/images/default.png'}
})

class Objeto{

    /*constructor(objeto){
        this.nombre=objeto.nombre
        this.telefono=objeto.telefono
        this.titulo=objeto.titulo
        this.descripcion=objeto.descripcion
        this.foto=this.foto
    }*/

    //getter y los setter
  /*   get errores(){
        let errores=[]
        if(this.nombre=="")errores.push({mensaje:"El nombre no puede estar vacío"})
        if(this.telefono=="")errores.push({mensaje:"El teléfono no puede estar vacío"})
    
    }
    set person(n){
        this.nombre=n.toUpperCase()
    }
    get person(){
        return this.nombre + ' ' + this.telefono
    } */
    //metodos privados
}

schemaObjeto.loadClass(Objeto)
module.exports=mongoose.model('Objeto',schemaObjeto)