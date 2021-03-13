
const express = require('express')
const rtMain = express.Router()
const daoObjetos = require('../dao/daoObjetos')
const Objeto = require('../models/Objeto')



//aqui te creas las rutas get, post, etc.. que necesies


rtMain.get('/', function (req, res) {
    res.render('inicio')
})




/* rtMain.get('/', function (req, res) {
    res.render('home_async')
})

rtMain.get('/objetos/nuevo',(req,res)=>{
    res.render('home_sync')
}) */

module.exports=rtMain
