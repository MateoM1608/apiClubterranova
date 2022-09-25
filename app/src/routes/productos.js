const { Router } = require('express')

const router = Router()

const { crearProducto, obtenerTodosProductos, eliminarProducto, modificarProducto, obtenerProducto, obtenerProductoPorcategoria } = require('../controller/ProductosControllers')

router.get('/', obtenerTodosProductos)
router.get('/:idProducto', obtenerProducto)
router.get('/categoria/:idCategory', obtenerProductoPorcategoria)
router.post('/', crearProducto)
router.delete('/:id', eliminarProducto)
router.put('/:id', modificarProducto)

module.exports = router