module.exports = (Sequelize, type) => {
    return Sequelize.define('Ventas',{
        id:{
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
          producto: type.TEXT,
          precio_unitario: type.FLOAT,
          cantidad: type.FLOAT,
          precio_total: type.FLOAT,
          fecha: type.DATE,
          usuario: type.TEXT
    })
}