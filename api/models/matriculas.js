'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Matriculas.belongsTo(models.Pessoas, { foreignKey: 'estudante_id' })
      Matriculas.belongsTo(models.Turmas, { foreignKey: 'turma_id' })
    }
  }
  Matriculas.init({
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Campo status não pode ser vázio.' },
        isIn: {
          args: [['confirmado', 'cancelado']],
          msg: 'Somente valores padrões são permitidos.'
        }
      }
    },
    
  }, {
    sequelize,
    modelName: 'Matriculas',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    version: true,
    paranoid: true,
    scopes: {
      confirmado: { where: { status: 'confirmado' }},
      cancelado: { where: { status: 'cancelado' } },
      apagado: { where: { deletedAt: { [Op.not]: null } } }
    }
  });
  return Matriculas;
};