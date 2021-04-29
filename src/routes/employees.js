// La constante "express" guarda todas las funcionalidades del módulo express.
const express = require('express');
const router = express.Router(); // Crea objeto que permite definir rutas del servidor.

const mysqlConnection = require('../database');

// Obtiene todos los empleados
router.get('/api/users/', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, filds) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// Obtiene un empleado por id
router.get('/api/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows, filds) => {
        if (!err) {
            // res.json(rows); // Imprime el objeto en un arreglo, pero sólo se necesita el objeto por ahora.
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// Agrega un nuevo empleado
router.post('/api/users/', (req, res) => {
    const { id, name, salary } = req.body;
    const query = `
        SET @id = ?;
        SET @name = ?;
        SET @salary = ?;
        CALL employeeAddOrEdit(@id, @name ,@salary);
        `; // Forma 1.
        mysqlConnection.query(query, [id, name, salary], (err, rows, filds) => {
            if (!err) {
                res.json({Status: 'Emplooyed Saved'});
            } else {
                console.log(err);
            }
        });
});

// Actualiza un empleado ya existente por el id
router.put('/api/user/:id', (req, res) => {
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = 'CALL employeeAddOrEdit(?, ?, ?)'; // Forma 2.
    mysqlConnection.query(query, [id, name, salary], (err, rows, filds) => {
        if (!err) {
            res.json({Status: 'Emplooyed Updated'});
        } else {
            console.log(err);
        }
    });
});

// Elimina un empleado por el id
router.delete('/api/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employee WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({Status: 'Emplooyed Deleted'});
        } else {
            console.log(err);
        }
    });
});

module.exports = router;
