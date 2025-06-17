const express = require ( 'express' );
constante cors = require ( 'cors' );
const aplicación = express ();
const puerto =
 proceso.env.PORT || 3000 ;​

aplicación. uso ( cors ());
aplicación.use (express.json ( ))
 ;

aplicación.post ( '/api/ v1 /validate' , ( req, res ) => {
  const userDeviceData = cuerpo del req .;
  devolver res. estado ( 200 ) .json ({
    estado : 200 ,
    dData : { usuarioDeviceData },
  });
});

aplicación. escuchar (puerto, () => {
  console.log ( `Servidor ejecutándose en el puerto $ {port} ` ) ;
});


