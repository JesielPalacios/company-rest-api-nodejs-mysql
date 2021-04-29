const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'blcxgoo2efjusgy7tqpi-mysql.services.clever-cloud.com',
    user: 'uy2kceevqf5dbxtp',
    password: 'OxEVNhUtLDT6z1hbT86H',
    database: 'blcxgoo2efjusgy7tqpi',
    multipleStatements: true // Cuando se usan los SET de la ruta /routes/empoyees.js
});

mysqlConnection.connect(function (err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Db is conected');
    }
});

module.exports = mysqlConnection;
