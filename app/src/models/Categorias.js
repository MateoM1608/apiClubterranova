module.exports = (Sequelize, type) => {
  return Sequelize.define('Categorias',{
      id:{
          type: type.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        nombre: type.TEXT,
  })
}