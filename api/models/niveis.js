'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Niveis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Niveis.hasMany(models.Turmas, {
        foreignKey: 'nivel_id'
      })
    }
  }
  Niveis.init({
    descr_nivel: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Campo descr_nivel não pode ser vázio.' },
        isIn: {
          args: [['básico', 'intermediário', 'avançada', 'básico2', 'intermediário2', 'avançada2']],
          msg: 'Somente valores padrões deve ser preenchidos.'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Niveis',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    version: true,
    paranoid: true,
    scopes: {
      apagado: { where: { deletedAt: { [Op.not]: null } } }
    }
  });
  return Niveis;
};