const { Router } = require('express')

const router = Router()

const { registrarUcuario, auntenticarUsuario, traerUsuarios, eliminarUsuario  } = require('../controller/UserController')

router.get('/',traerUsuarios)
router.post('/registrar', registrarUcuario)
router.post('/autenticar',auntenticarUsuario)
router.delete('/eliminar/:id',eliminarUsuario)


module.exports = router