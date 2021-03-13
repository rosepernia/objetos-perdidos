const mongoose = require('mongoose')

//mongoose.connect('mongodb://usuario1:1234@localhost:27017/objetosPerdidos',{

mongoose.connect('mongodb://localhost:27017/objetosPerdidos',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false  
})

module.exports = mongoose.connection