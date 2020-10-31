
const express = require('express');
const router = express.Router();
const {nuevo, mostrar, detallesVehiculo, mostrarRecientes, eliminar, mostrarCarrosById, mostrarImg} = require('../controladores/controlador.carros');

router.post('/nuevo', nuevo);
router.get('/mostrar-recientes', mostrarRecientes);
router.get('/mostrar-todo', mostrar);
router.get('/img/:id', mostrarImg);
router.get('/detalles/:id', detallesVehiculo);
router.delete('/:id',eliminar);

router.param('id',mostrarCarrosById);

module.exports = router;
