const express = require ( 'express' );
constante cors = require ( 'cors' );

const aplicación = express ();
const PUERTO =
 proceso.env.PUERTO || 3000 ;​​ 

aplicación. uso ( cors ());
aplicación.use (express.json ( ))
 ;

aplicación.post ( '/api/ v1 /validate' , ( req, res ) => {
  const { sub_clave, id_único, slug, mo_no, b_version, r_id } = cuerpo requerido ;
  // En una implementación real, validarías la carga útil.
  // Aquí simplemente devolvemos una respuesta de muestra.
  constante userDeviceData = {
    sub_clave,
    id único,
    babosa,
    mononucleosis infecciosa,
    b_versión,
    deshacerse,
    validado : verdadero ,
  };
  // Incluya un campo de estado para que la extensión pueda verificar que la solicitud fue exitosa
  res. status ( 200 ) .json ({ status : 200 , userDeviceData });
});

aplicación.get ( '/api/v1/subscription-key/remove' , ( req, res ) = >
 {
  const { id, tipo } = consulta req .;
  // En una implementación real, eliminarías la licencia por id/tipo.
  res. json ({ estado : 200 , mensaje : 'Licencia eliminada' });
});

aplicación. escuchar ( PUERTO , () => {
  console.log ( `Servidor escuchando en el puerto $ {PORT} ` ) ;
});
