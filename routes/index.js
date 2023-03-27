var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModels = require('../models/novedadesModels')


/* GET home page. */
router.get('/', async function(req, res, next) {
var novedades = await novedadesModels.getNovedades();

  res.render('index', {novedades});
});

router.post('/',async(req,res,next) =>{
console.log(req.body);

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;
  
  var obj = {
  to:"oscarns@gmail.com",
  subject:"Contacto desde la web",
  html: nombre + " " + apellido + " Se contacto a traves de este correo : " + email + " . <br> además hizo este comentario " + mensaje + " Su telefono es: " + telefono

    }

    var transporter = nodemailer.createTransport({
    
      host:process.env.SMTP_HOST,
      port:process.env.SMTP_PORT,
      auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
      }
    })
    var info = await transporter.sendMail (obj);
   
    res.render('index',{
      message: 'Mensaje enviado correctamente'
    } )
})



module.exports = router;
