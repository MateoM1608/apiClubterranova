const { Venta } = require('../db.js');
const { Producto } = require('../db.js')
const { Op } = require("sequelize");
const moment = require('moment')


//----------- Crear venta ----------

const crearVenta = async(req, res) => {
    const { usuario, cantidadAVender, metodoPago } = req.body;
    const { idProducto } = req.params;
    const momento =  moment().subtract(5, 'hours').format()
    
    const producto = await Producto.findOne({
        where: {
            id: idProducto
        }
    })
    
    const cantidadRestante = producto.cantidad - cantidadAVender
    
    if(cantidadRestante >= 0){
        
        await Producto.update({
            cantidad: cantidadRestante
        },{
            where:{
                id: idProducto
            }
        })
        
        const precioTotal = producto.precio * cantidadAVender;

        
        await Venta.create({
            producto: producto.nombre,
            precio_unitario: producto.precio,
            cantidad: cantidadAVender,
            precio_total: precioTotal,
            metodo: metodoPago,
            fecha: momento,
            usuario: usuario
        })
        res.send('Venta creada correctamente')
    }else{
        res.send({error: 'No existe en inventario la cantidad que desea vender'})
    }
}

//----------- Eliminar venta ----------

const eliminarVenta = async (req, res) => {

    const { ventaId } = req.params
    try{
        const venta = await Venta.findOne({
            where:{
                id: ventaId
            }
        })
    
        let ventaJSON = JSON.parse(JSON.stringify(venta))
    
        const findProducto = await Producto.findOne({
            where:{
                nombre: ventaJSON.producto
            }
        })
        const _findProducto = JSON.parse(JSON.stringify(findProducto));
        
        await Venta.destroy({
            where:{
                    id:ventaId
            }
        })
    
        if(_findProducto){
            const numCantidad = Number(ventaJSON.cantidad)
            const sumCantidad = _findProducto.cantidad + numCantidad
            
            await Producto.update({
                cantidad: sumCantidad
            },{
                where: {
                    id: _findProducto.id
                }
            })
            return res.send('Se elimina correctamente la venta, se actualiza pruducto')
            
        }
    
        res.send('Se elimina correctamente la venta, sin producto para actualizar')
    }catch(err){
        res.send(err)
    }
}



//----------- Obtener ventas ----------

const informeVentas = async(req, res) => {

    const { fechaInicio , fechaFinal } = req.body;

    const fechaini = moment(fechaInicio).subtract(5, 'hours').format()
    const fechafin = moment(fechaFinal).subtract(5, 'hours').format()


    const informeVenta = await Venta.findAll({
        where:{
            fecha :{
                [Op.between]: [fechaini, fechafin]
            }
        }
    })
    let totalVendido = 0
    let totalProdVen = 0

    informeVenta.map( p => {
        totalVendido += p.precio_total
        totalProdVen += p.cantidad
    })
    res.send([{
        informe: informeVenta,
        total: {
            "total_productos": totalProdVen,
            "total_venta": totalVendido
        }
    }, informeVenta.length])
}



module.exports =  { crearVenta , eliminarVenta, informeVentas }