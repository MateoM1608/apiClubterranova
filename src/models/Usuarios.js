module.exports = (Sequelize, type) => {
    return Sequelize.define('Usuarios',{
        id:{
            type: type.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,

          },
          username: type.TEXT,
          password: type.TEXT
    })
}