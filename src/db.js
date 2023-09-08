require('dotenv').config();
const { Sequelize } = require('sequelize');
// const fs = require('fs');
// const path = require('path');
const {
  DATABASE, DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

//Importar Modelos

const VentaModel = require('./models/Ventas')
const ProductoModel = require('./models/Productos')
const CategoriaModel = require('./models/Categorias')
const UsuarioModel = require('./models/Usuarios')
const BodaModel = require('./models/Bodas')

//Definimos los parametros de conexion de la base de datos
const sequelize = new Sequelize(`${DATABASE}`,`${DB_USER}`,`${DB_PASSWORD}`,{
  host: `${DB_HOST}`,
  dialect:'mysql',
  dialectOptions: {
    connectTimeout:100000
  },
  // define: {
  //   timestamps: false
  // },
  // pool: {
  //   max: 25,
  //   min: 0,
  //   idle: 10000
  // },
})

const Venta = VentaModel(sequelize, Sequelize);
const Producto = ProductoModel(sequelize, Sequelize);
const Categoria = CategoriaModel(sequelize, Sequelize)
const Usuario = UsuarioModel(sequelize, Sequelize)
const Boda = BodaModel(sequelize, Sequelize)

sequelize.sync({ force: false})
.then(() => {
  console.log('Tablas sincronizadas')
})

// RELACIÓN DE TABLAS

//categorias <-> productos
Categoria.belongsToMany(Producto, { through: 'Categoria_producto' });
Producto.belongsToMany(Categoria, { through: 'Categoria_producto' });


module.exports = {
  Venta,
  Producto,
  Categoria,
  Usuario,
  Boda
}