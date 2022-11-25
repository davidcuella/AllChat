const express = require('express')
const rutador = express.Router();
const nodemailer=require('nodemailer');
const { google } = require("googleapis");

rutador.get('index.html',(req,res)=>{
    res.send('GET request to the homepage')
});

rutador.post('/enviar-correo', (req,res)=>{
    const {nombre, correo, telefono, fecha, mensaje} = req.body;

    contentHTML = `
    <h1>Informacion de reporte del usuario</h1>
    <ul>
        <li>Usuario: ${nombre}</li>
        <li>Correo del usuario: ${correo}</li>
        <li>Telefono: ${telefono}</li>
        <li>Fecha: ${fecha}</li>
        <p>${mensaje}</p>
    </ul>
    `;

    const CLIENT_ID="15914908594-n7nscj3regu1jpmco91smnit2lp40a7k.apps.googleusercontent.com";
    const CLIENTE_SECRET="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";
    const REDIRECT_URI="https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN="1//04WWvRCkHjMn6CgYIARAAGAQSNwF-L9IrjKfRuE50zyTD_dWMkxQdkFwkv0-HW8mBxt6vBrpmdnzXMDtWBRBI5ADWt_xHyr5NruY";

    const oAuth2Client= new google.auth.OAuth2(CLIENT_ID,CLIENTE_SECRET,REDIRECT_URI);
    oAuth2Client.setCredentials({refresh_token:REFRESH_TOKEN});

    async function sendMail(){
        try{ //await para hacerlo de forma asíncrona XD
        const accessToken=await oAuth2Client.getAccessToken()
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:"OAuth2",
                user:"chattsitounuteam@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENTE_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const mailOptions={
          from:"Soporte Chatsitto UnU <chattsitounuteam@gmail.com>",
          to: "soportechattsitounu@gmail.com",
          subject:"Report o Sugerencia de Chattsito UnU",
          html:contentHTML,
        };

        const resultado = await transporter.sendMail(mailOptions)
        return resultado;
    } catch(err){
        console.log(err);
         }
    }
    sendMail()
    .then((resultado)=> res.status(200).send(`
    <!DOCTYPE html>
     <html lang="en">
        <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NodeMailer</title>
        <link rel="stylesheet" href="https://bootswatch.com/5/vapor/bootstrap.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <body>
    <br>
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%;"></div>
      </div>
     <div class="container mt-7">
       
        <div class="row">
            <div class="col-md-6">
                <br>
                <h1> Tu reporte ha sido enviado correctamente. <br><br><br>
                Tendras respuesta pronto
                de nuestro equipo de soporte!<br><br><br>

                Gracias por cooperar con ChatUnU
                  </h1></div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="col-md-4">
                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br>
                <h3><A HREF="index.html">Regresar a la página principal <i class="large material-icons">keyboard_return
                </i></h3> </A>
                </div>
        </div>
    </div>
    
    </div>
    
    </body>
    </html>`))
    .catch((error) =>console.log(error.message));
});

module.exports = rutador;
