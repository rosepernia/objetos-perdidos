
const express = require('express')
const rtObjetos = express.Router()
const daoObjetos = require('../dao/daoObjetos')
const Objeto = require('../models/Objeto')

rtObjetos.get('/objetonuevo',async (req,res)=>{
    res.render('objetonuevo')
 
})

//rtObjetos.post('/guardar',(req,res)=>{
    /* req.body.foto=`/images/${req.files.foto.name}` */
    /* console.log(req.body)
    let o=new Objeto(req.body)
    let file = req.files.foto
    file.mv(`public/images/${file.name}`,err=>{
        if(err) console.log(err)
        o.foto=`/images/${file.name}`
        o.save()
        res.json(o)
    })
}) */


rtObjetos.post('/guardar',(req,res)=>{
    /* req.body.foto=`/images/${req.files.foto.name}` */
    if(req.files!=null){//has subido un archivo??
        let o=new Objeto(req.body)
        let file = req.files.foto
        file.mv(`public/images/${file.name}`,err=>{
            if(err) console.log(err)
        })
        req.body.foto=`/images/${file.name}`
    }
    daoObjetos.save(req.body)  
       .then(resp=>res.render('objetonuevo'))  
})



rtObjetos.get('/listado',async (req,res)=>{
    let objetosPerdidos=await daoObjetos.find()
    res.render('listado',{objetosPerdidos:objetosPerdidos})
    //res.json(await daoObjetos.find())
})

rtObjetos.post('/filtrar',(req,res)=>{
    daoObjetos.listarTitulo(req.body.titulo)
       .then(listado=>
        res.json(listado)
        )
})

rtObjetos.get('/detalle/:id', (req,res)=>{
    let id=req.params.id
    //busco objeto que tenga ese id
    daoObjetos.buscarPorId(id)
      .then(encontrado=>{
        res.render('editarobjeto', encontrado)
      })
   
 
})

rtObjetos.get('/editarobjeto', (req,res)=>{
    res.render('editarobjeto')
 
})



module.exports=rtObjetos