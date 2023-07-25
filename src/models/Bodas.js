module.exports = (Sequelize, type) => {
    return Sequelize.define('Bodas',{
        id:{
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombres: type.TEXT,
        invitados: type.FLOAT,
        asistiran: type.FLOAT,
        recepcion: type.FLOAT,
    })
}