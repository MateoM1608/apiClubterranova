const { Router } = require('express');


const router = Router();

// Importar rutas

const ventas = require('./ventas.js');
const productos = require('./productos.js')
const categorias = require('./categorias.js')
const usuario = require('./usuarios.js')

// importar Middlewares

const { checkToken } = require('../middlewares/authToken')

// Configurar los routers

router.use('/ventas', ventas)
router.use('/productos', productos)
router.use('/categorias', categorias)
router.use('/usuario', usuario)



module.exports = router;