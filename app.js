const express = require('express')
const app = express()
const rtMain = require('./routes/rtMain')
const rtUsuarios = require('./routes/rtUsuarios')
const rtObjetos = require('./routes/rtObjetos')
var exphbs  = require('express-handlebars')
const conexion = require('./conexion')
const fileUpload = require('express-fileupload')
const session = require('express-session')

//plantillas
app.engine('.hbs', exphbs({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload())
app.use(session({
    secret: 'clavesesion',
    resave: false,
    saveUninitialized: true
  }))

let rutasPrivadas=[
    '/usuarios/objetos',
    '/objetos/objetonuevo',
    '/objetos/listado'
]
app.use((req,res,next)=>{
    //console.log('usuario autenticado', req.url)
    if (req.session.autenticado){
        res.locals.session=req.session
        next()
    }   
  else{
    if(rutasPrivadas.indexOf(req.url)!=-1){
        console.log('no esta autenticado')
        //return console.log('no existe usuario')
        //return res.sendStatus(401)
    }
    else next()
  }
    
}) 

//enrutadores
app.use('/',rtMain)
app.use('/usuarios',rtUsuarios)
app.use('/objetos',rtObjetos)

//mongoDB
conexion.on('error',console.error.bind(console,'Error al conectar a mongo'))
conexion.once('open',()=>console.log("Conexión con Mongo OK!!"))

//puerto servidor:
app.listen(3001,(err)=>{
    console.log('Server run on port 3001')
})