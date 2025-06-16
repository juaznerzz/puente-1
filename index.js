const express = require ( 'express' );
constante cors = require ( 'cors' );
const aplicación = express ();
const puerto =
 proceso.env.PORT || 3000 ;​

// Configuración de CORS para permitir solicitudes de cualquier origen
aplicación. uso ( cors ());

// Middleware para manejar JSON
aplicación.use (express.json ( ))
 ;

// Ruta para validar la clave de licencia
aplicación.post ( '/api/ v1 /validate' , ( req, res ) => {
    // Recibir los datos de la solicitud
    const { sub_clave, id_único, mo_no, slug, b_version, r_id } = cuerpo requerido ;
    // slug, b_version y r_id se reciben del cliente pero no se
    // validados en el servidor. Están reservados para uso futuro y actualmente...
    // ignorado en la lógica de validación.

    // Verificar si la clave de licencia y el ID de usuario son correctos
    if (sub_key === "123456" && Unique_id === "KH6kRZbbMwGZNpP7BZfubCG7sBhx9yJBYYAauyuN5EXKCHP" && mo_no === "593961758817" ) {
        // Si es válido, devolver un estado 200 y el mensaje de éxito
        devolver res. estado ( 200 ) .json ({
            válido : verdadero ,
            Mensaje : 'Licencia validada exitosamente'
        });
    }

    // Si no es válido, devolver un error 400 y el mensaje de error
    devolver res. estado ( 400 ) .json ({
        válido : falso ,
        Mensaje : 'Licencia o ID de usuario no válidos'
    });
});

// Iniciar el servidor
aplicación. escuchar (puerto, () => {
    console.log ( `Servidor ejecutándose en el puerto $ {port} ` ) ;
});
