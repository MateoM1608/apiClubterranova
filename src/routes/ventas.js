const { Router } = require('express')

const router = Router()

// importar controladores

const { crearVenta, eliminarVenta, informeVentas } = require('../controller/VentasController')


// Rutas

router.post('/crear/:idProducto', crearVenta)
router.delete('/eliminar/:ventaId', eliminarVenta)
router.post('/informes', informeVentas)

module.exports = router