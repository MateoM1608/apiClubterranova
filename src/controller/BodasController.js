const multer = require('multer')
const { Boda } = require('../db.js')
const fs = require('fs')
const XLSX = require('xlsx')


const importArchivo = async(req, res, next) => {

    try{

        await Boda.truncate({cascade:true})
        const file = XLSX.readFile(req.file.path)
        const workbookSheet = file.SheetNames;

        const sheet = workbookSheet[0];
        const dataExcel = XLSX.utils.sheet_to_json(file.Sheets[sheet])

        dataExcel.map(async(data) => {
            let datos = data.nombres.split('/');
            let nombres = datos[0].replaceAll('-',' ')
            let invitados = datos[1].split('-')[0]
            await Boda.findOrCreate({
                where: {
                    nombres: nombres,
                    invitados: invitados,
                    asistiran: 0,
                    recepcion: 0
                }
            })
        })
        return res.send('Archivo importado correctamente')
    }catch(err){
        next(err)
    }

}

const consultarTodosAsistentes = async (req, res, next) => {
    try{
        const asistentes = await Boda.findAll({
            attributes: ['id', 'nombres', 'invitados', 'asistiran','recepcion'],
        })
        res.send(asistentes)
    }catch(err){
        next(err)
    }
}

const consultarInvitado = async(req, res, next) => {
    try{
        const { id } = req.body

        const invitado = await Boda.findOne({
            where:{
                id: id
            }
        })
        res.send(invitado)
    }catch(err){
        next(err)
    }
}

const cambioAsistencia = async(req, res, next) => {
    try{
        const { id, asistencia, recepcion } = req.body

        await Boda.update({
            asistiran: asistencia,
            recepcion: recepcion
        },{
            where: {
                id: id
            }
        })
        res.send('Asistencia actualizada correctamente')
    }catch(err){
        next(err)
    }
}

const crearLinks  = async(req, res, next) => {
    try{
        const asistentes = await Boda.findAll()
        let dataExcel = [];
        asistentes.map(asistente => {
            let nombre = asistente.nombres.replaceAll(' ','-')
            dataExcel.push({
                nombres: asistente.nombres,
                link: `https://boda-camilo-ana.vercel.app/${asistente.id}/${nombre}/${asistente.invitados}-personas/&&`
            })
        })
        res.send(dataExcel)

    }catch(err){
        next(err)
    }
}


module.exports = { importArchivo, consultarTodosAsistentes, consultarInvitado, cambioAsistencia, crearLinks}


