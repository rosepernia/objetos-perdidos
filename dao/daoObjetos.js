const Objeto = require('../models/Objeto')

let daoObjetos={}

//guardar
daoObjetos.save = function save(objeto){
    return new Promise((resolved,reject)=>{
        let o = new Objeto(objeto)
        o.save()
        resolved(o)
    })
}

//listar
daoObjetos.find=function find(){
    return new Promise((resolved,reject)=>{
        resolved(Objeto.find().lean())
    })
}

//buscar
daoObjetos.listarTitulo=function listarTitulo(param){
    return new Promise((resolved,reject)=>{
        resolved(Objeto.find({titulo:{$regex: `.*${param}.*`}}).lean())
    })
}

//buscar por id
daoObjetos.buscarPorId = function buscarPorId(id) {
    return new Promise((resolved, reject) => {
       resolved(Objeto.findOne({ _id: id }).lean())
    })
}

//editar
/* daoObjetos.edit = function edit(req, res, next){
    Usuario.findByIdAndUpdate(req.usuario.id, req.body, function(err, usuario){
        if(err){
            return next(err);
        } else {
            res.json(usuario);
        }
    });
}; */

//eliminar




module.exports=daoObjetos
