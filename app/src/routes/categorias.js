const { Router } = require('express')

const router = Router()

const { crearCategoria, eliminarCategoria, obtenerCategorias, modificarCategoria } = require('../controller/CategoriasController')

router.get('/', obtenerCategorias)
router.post('/', crearCategoria)
router.delete('/:id', eliminarCategoria)
router.put('/:id', modificarCategoria)

module.exports = router