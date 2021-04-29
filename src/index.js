// La constante "express" guarda todas las funcionalidades del módulo express.
const express = require('express');
const app = express(); // El objeto express se almacena/guarda en la constante app.

// Settings: Puerto, entorno de desarrollo, nombre de la aplicación, motor de plantillas, etc.
app.set('port', process.env.PORT || 3000);

// Middlewares: Funciones que se ejecutan antes de procesar algo de las funcionalidades de las rutas.
app.use(express.json()); // Usar el módulo de express para trabajar con archivos en formato json.

// Routes: Crear url para enviar y procesar datos.
app.use(require('./routes/employees.js'));

// Starting the server
// app.listen(3000, () => {
//     console.log('Server on port 3000');
// });

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
