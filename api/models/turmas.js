'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turmas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Turmas.hasMany(models.Matriculas, { foreignKey: 'turma_id' })
      Turmas.belongsTo(models.Pessoas, { foreignKey: 'docente_id' })
      Turmas.belongsTo(models.Niveis, { foreignKey: 'nivel_id' })
    }
  }
  Turmas.init({
    data_inicio: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: { msg: 'Somente datas pode ser preenchido.' }
      }
    }
  }, {
    sequelize,
    modelName: 'Turmas',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    version: true,
    paranoid: true,
    scopes: {
      apagado: { where: { deletedAt: { [Op.not]: null  } } }
    }
  });
  return Turmas;
};