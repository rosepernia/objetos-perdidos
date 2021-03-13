const express = require('express')
const rtUsuarios = express.Router()
const daoUsuarios = require('../dao/daoUsuarios')
const Usuario = require('../models/Usuario')
const session = require('express-session')


rtUsuarios.get('/registro', function (req, res) {
    res.render('registro')
})


rtUsuarios.post('/nuevousuario', (req, res) => {
    daoUsuarios.guardar(req.body)
        .then((resp) => {
            res.render('registro', {mensaje: "Usuario guardado con éxito"})
        }).catch((err) => {
            res.render('registro',{mensaje: err})

            /* if (err.code == 11000){
                res.render('registro', {errEmail: true})
            }
            else if(err.path=='pasword' )
              res.render('registro', {errPass:true}) */

          /*   else {
                res.render('registro',{mensaje: err})
            }  */
         
            
        })
})

rtUsuarios.get('/login', function (req, res) {
    res.render('login')
})


rtUsuarios.post('/iniciarsesion', (req, res) => {
    daoUsuarios.login(req.body)
        .then(respuesta => {
            if (respuesta.resultado) {
                req.session.autenticado = true
                res.locals.session=req.session//inyectamos datos sesion para que las vistas lo reconozcan
                res.redirect('/usuarios/objetos')
            }
            else {
                res.render('login', { body: req.body, mensaje: respuesta.mensaje })
            }
        })
        .catch(err => {
            res.render('login', { body: req.body, mensaje: 'Ups!! Algo ha ido mal' })
        })
})

rtUsuarios.get('/unlogin', function (req, res) {
    req.session.destroy()
    res.redirect('/')
})

//contraseña olvidada
rtUsuarios.get('/nuevopassword', function (req, res) {
    res.redirect('nuevopassword')
})



rtUsuarios.get('/objetos', function (req, res) {
    res.render('objetos')
})



    







module.exports=rtUsuarios 