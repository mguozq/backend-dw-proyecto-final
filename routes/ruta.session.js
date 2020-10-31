
const express = require('express');
const router = express.Router();
const {nuevo, login, logout} = require('../controladores/controlador.session');

router.post('/registro', nuevo);
router.post('/login',login);
router.post('/logout', logout);

module.exports = router;