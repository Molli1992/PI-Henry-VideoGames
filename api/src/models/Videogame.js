const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_de_lanzamiento: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
    plataformas: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING
    },
    imagen: {
      type: DataTypes.STRING,
    }
  });
};