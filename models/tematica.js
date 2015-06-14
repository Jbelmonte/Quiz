// Definición del modelo de Quiz

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Tema', {
		codigo: DataTypes.STRING,
		descripcion: DataTypes.STRING
	});
};
