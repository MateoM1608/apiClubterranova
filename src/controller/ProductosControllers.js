const { Producto, Categoria, ProductoCategoria } = require('../db.js');
const axios = require('axios');
const { nextTick } = require('process');


//---------- Crear Producto --------------

const crearProducto = async (req, res) => {
    const { nombre, precio, idCategoria, cantidad } = req.body;

    const getCategorias = await Categoria.findOne({
        where:{
            id: idCategoria
        }
    })
    if(nombre && precio){
        const productoCreado = await Producto.create({
            nombre,
            precio,
            cantidad
        })
        await productoCreado.addCategoria(getCategorias);
        return res.send('Producto creado correctamente')    
    }else{
        return res.send('Datos faltantes')
    }
}

//---------- Obtener todos los Productos --------------


const obtenerTodosProductos = async(req, res, next)=> {

    try{
        const productos = await Producto.findAll({
            include: {
                model: Categoria,
                attributes: ['nombre', 'id'],
                through : {
                    attributes: []
                }
            }
        })
        res.json(productos)
    }catch(err){
        next(err)
    }
    
}

//---------- Obtener un Producto --------------

const obtenerProducto = async(req, res, next)=> {
    
    const { idProducto } = req.params;

    try{
        const productos = await Producto.findOne({
            where:{
                id: idProducto
            },
            include: {
                model: Categoria,
                attributes: ['nombre', 'id'],
                through : {
                    attributes: []
                }
            }
        })
        res.json([productos])
    }catch(err){
        next(err)
    }
    
}

//---------- Obtener Productos por categoria --------------

const obtenerProductoPorcategoria = async(req, res, next)=> {
    
    const { idCategory } = req.params;

    try{
        const productos = await Producto.findAll({
            include: {
                model: Categoria,
                attributes: ['nombre', 'id'],
                through : {
                    attributes: []
                }
            }
        })
        const findProductos = []
        const _Productos = JSON.parse(JSON.stringify(productos));
        _Productos.map(p => {
            if(p.Categorias[0].id == idCategory){
                findProductos.push(p)
            }
        })
        res.json(findProductos)
    }catch(err){
        next(err)
    }
    
}

//---------- Eliminar Producto --------------


const eliminarProducto = async(req, res, next) => {
    const { id } = req.params;

    Producto.destroy({
        where:{
            id:id
        }
    }).then(data => res.send('Producto eliminado correctamente'))
    .catch(err => res.status(500).send(err))
}


//---------- Modificar Producto --------------


const modificarProducto = async(req,res,next) => {
    const { id } = req.params;
    const { nombre, precio, cantidad, sumarCantidad } = req.body;

    try{
        if(sumarCantidad && cantidad){
            res.send('No es posible agregar cantidad y sumarCantidad')
        }else if(sumarCantidad){
            const findProducto = await Producto.findOne({
                where:{
                    id: id
                }
            })
            const _findProducto = JSON.parse(JSON.stringify(findProducto));
            const numCantidad = Number(sumarCantidad)
            const sumCantidad = _findProducto.cantidad + numCantidad
            
            await Producto.update({
                nombre: nombre,
                precio: precio,
                cantidad: sumCantidad
            },{
                where: {
                    id: id
                }
            })
            res.send('producto actualizado correctamente')
        }else{
            await Producto.update({
                nombre: nombre,
                precio: precio,
                cantidad: cantidad
            },{
                where: {
                    id: id
                }
            })
            res.send('producto actualizado correctamente')
        }

        
    }catch(err){
        next(err)
    }

}

module.exports = { 
    crearProducto, 
    obtenerProducto,
    eliminarProducto, 
    modificarProducto, 
    obtenerTodosProductos, 
    obtenerProductoPorcategoria
}