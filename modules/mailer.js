const nodemailer = require("nodemailer");
const fs = require('fs')

const mailer={}

mailer.send = async function send(destinatario/* ,template */) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'proyectoyana@gmail.com', // generated ethereal user
      pass: 'Fullstack#01', // generated ethereal password
    },
  });

  // send mail with defined transport object
  //mailer.getTemplate(template)
   // .then(datos=>
        let info= await transporter.sendMail({
            from: '"Fred Foo" <foo@example.com>', // sender address
            to: destinatario, // list of receivers
            subject: "Reserva de su cita", // Subject line
            text: "Estos son sus datos", // plain text body
            //html: datos.replace('{{email}}',destinatario)
            html:"<h1>activar tu cuenta</h1>"
          })
   // )
  console.log(info)
}

mailer.getTemplate= async function getTemplate(template){
    return fs.readFileSync('./modules/mailer-templates/' + template + '.html','utf8')
}

module.exports=mailer
