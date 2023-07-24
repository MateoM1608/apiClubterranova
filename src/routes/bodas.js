const { Router } = require('express')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const router = Router()

const { importArchivo, consultarTodosAsistentes, consultarInvitado, cambioAsistencia, crearLinks } = require('../controller/BodasController')

router.post('/', upload.single('file'), importArchivo)
router.get('/todos', consultarTodosAsistentes)
router.get('/',consultarInvitado)
router.put('/',cambioAsistencia)
router.get('/link', crearLinks)

module.exports = router