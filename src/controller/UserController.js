const { Usuario } = require('../db.js');
const  bcrypt  = require('bcryptjs');
const jwt = require('jwt-simple');
const moment = require('moment')

// ------- Registrar Usuario ---------

const registrarUcuario = async(req, res, next ) => {
    const { username, password } = req.body;

    try{
        if(username && password){
            const passwordEncrypt = bcrypt.hashSync(password, 10);
            await Usuario.findOrCreate({
                where:{ username: username },
                defaults:{
                    username: username,
                    password: passwordEncrypt
                }
            })
            res.send('Usuario creado correcamente')
        }else if(!username && !password){
            var errors = {
                'usuario': 'El usuario es necesario',
                'contraseña': 'la contraseña es necesaria para crear un usuario'
            }
            res.send(errors)
        }else if(!username){
            var errors = {
                'usuario': 'El usuario es necesario'
            }
        }else{
            var errors = {
                'contraseña': 'la contraseña es necesaria para crear un usuario'
            }
        }
        res.send(errors)
    }catch(err){
        next(err)
    }

}

// ------- Autenticar ---------

const auntenticarUsuario = async (req, res) => {
    const { username, password } = req.body;
    
    const user = await Usuario.findOne({
        where: {
            username: username
        }
    })
    if(user){
        const iguales = bcrypt.compareSync( password, user.password);

        if(iguales){
            res.send({ 
                access_token : createToken(user),
                user: {
                    id: user.id,
                    username: user.username
                }
            })
        }else{
            res.send('Error en usuario y/o contraseña')
        }
    }else{
        res.send('Error en usuario y/o contraseña')
    }
}

// ------- Crear Token ---------

const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(500, 'minutes').unix()
    }
    return jwt.encode(payload, 'frase secreta');
}


// ------- Traer Usuario ---------

const traerUsuarios = async(req, res) => {

    const AllUser = await Usuario.findAll({
        attributes: ['id', 'username'],
    })
    res.send(AllUser)
}

// ------- Eliminar Usuario ---------

const eliminarUsuario = async(req, res) => {
    
    const { id } = req.params;

    if(id == 1){
        res.send('El Administrador no puede ser eliminado')
    }else{
        await Usuario.destroy({
            where: {
                id: id
            }
        })
        res.send('Usuario eliminado corectamente')
    }

}



module.exports =  { registrarUcuario, auntenticarUsuario, traerUsuarios, eliminarUsuario }

