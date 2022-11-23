const { Categoria } = require('../db.js');
const { Producto } = require('../db.js')
const axios = require('axios');


//-------- Crear categoria --------------

const crearCategoria = async (req, res, next) => {
    const { nombre } = req.body;

    try{
        await Categoria.findOrCreate({
            where: {
                nombre: nombre
            }
        })
        return res.send('Categoria creada correctamente')
    }catch(err){
        next(err)
    }
};

//-------- Eliminar categoria --------------

const deleteProduct = async (prod) => {
    await Producto.destroy({
        where : {
            id: prod
        }
    })
}

const eliminarCategoria = async (req, res, next) => {
    const { id } = req.params;

    try{
        const allProducto = await Producto.findAll({
            include: {
                model: Categoria,
                attributes: ['nombre', 'id'],
                through : {
                    attributes: []
                }
            }
        })
        
        const findProductos = []
        const _Productos = JSON.parse(JSON.stringify(allProducto));
    
        _Productos.map(p => {
            if(p.Categorias[0].id == id){
                findProductos.push(p)
            }
        })
    
        findProductos.map(p => {
            deleteProduct(p.id)
        })
    
        await Categoria.destroy({
            where : {
                id : id
            }
        }).then( data => res.send('Categoria eliminada correctamente'))
        .catch(err => res.status(500).send(err))
    }catch(err){
        next(err)
    }
}



//-------- Obtener categoria --------------

const obtenerCategorias = async(req, res, next) => {
    
    const categorias = await Categoria.findAll()
    res.send(categorias)
}


//-------- Modificar categoria --------------


const modificarCategoria = async(req, res, next) => {
    const { id } = req.params;
    const { nombre } = req.body;

    if(nombre){
        await Categoria.update({
            nombre: nombre
        },{
            where: {
                id: id
            }
        })
        res.send('categoria actualizada correctamente')
    }else{
        res.send('Ingresa el nuevo nombre de la categoría')
    }
}

module.exports = { crearCategoria, eliminarCategoria, obtenerCategorias, modificarCategoria }