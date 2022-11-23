module.exports = (Sequelize, type) => {
  return Sequelize.define('Productos',{
      id:{
          type: type.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: type.TEXT,
        precio:type.FLOAT,
        cantidad: type.FLOAT
  })
}