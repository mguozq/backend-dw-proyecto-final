
const express = require('express');
const router = express.Router();
const {nuevo,mostrar,eliminar,contactosById} = require('../controladores/controlador.contactos.js');

router.post('/nuevo',nuevo);
router.get('/mostrar',mostrar);
router.delete('/:id',eliminar);

router.param('id',contactosById);

module.exports = router;
