const Usuario = require('../models/Usuario')
const mailer = require('../modules/mailer')
let daoUsuarios = {}

//guardo:
daoUsuarios.guardar = function guardar(usuario) {
    return new Promise((resolved, reject) => {
        let u = new Usuario(usuario)
        u.save()
            .then(() => {
               /*  mailer.send(u.email) */
                resolved(u)
            })
            .catch(err => reject(err))
    })
}
//busco usuario por email:
daoUsuarios.getUsuarioByEmail = function getUsuarioByEmail(email) {
    return new Promise((resolved, reject) => {
        Usuario.findOne({ email: email })
        .then(usuario=>resolved(usuario))
        .catch(err=>reject(err))
    })
}

//compruebo credenciales:
daoUsuarios.login = function login(credenciales) {
    return new Promise((resolved, reject) => {
        daoUsuarios.getUsuarioByEmail(credenciales.email)
        console.log(credenciales.nombre)
            .then(async usuario => {
                if (usuario == null)
                    resolved({resultado:false, mensaje:{usuario:'Este usuario no existe'}})
                else{
                    //la función comprobarPwd devuelve true o false
                   let respuesta = await usuario.comprobarPwd(credenciales.password)
                   if (respuesta)
                    resolved({resultado:respuesta, mensaje:'Usuario correcto'})
                   else{
                    resolved({resultado:respuesta, mensaje:{password:'Ups! la contraseña introducida no es correcta'}})
                   }
                }
            })
            .catch(err=>reject(err))

    })
}



module.exports = daoUsuarios
