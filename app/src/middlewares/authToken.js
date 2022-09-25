const jwt = require('jwt-simple')
const moment = require('moment')

const checkToken = (req, res, next) => {
    
    if(!req.headers['user-token']){
        return res.json({error: 'Necesitas incluir el user-token en la cabecera'})
    }

    const userToken = req.headers['user-token']
    let payload = {}

    try{
        payload= jwt.decode(userToken, 'frase secreta')
    }catch(err){
        return res.send({error: 'El token es incorrecto'})
    }

    if(payload.expiredAt < moment().unix()){
        res.send({error: 'El token ha expirado'})
    }

    req.usuarioId = payload.usuarioId;

    next();
}

module.exports = { checkToken } 