'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // 
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: { status: 'confirmado' },
        as: 'aulasMatriculadas'
      })
    }
  }
  // validattions
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Campo nome não pode ser vázio.' },
        minimo: function (dado) {
          if (dado.trim().length < 3) throw new Error('O Campo deve ter mais de 3 (três) caracteres.')
        },
        is: {
          args: ["^[a-z A-Z]+$", 'i'],
          msg: 'Somente permitido letras.'
        }
      }
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { msg: 'Campo ativo não pode ser vázio.' },
        isIn: {
          args: [[false,true]],
          msg: 'Somente aceitos zero ou um'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Campo email não pode ser vázio.' },
        isEmail: { msg: 'Por favor insira um email válido.' },
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Campo role não pode ser vázio.' },
        isIn: {
          args: [['estudante', 'docente']],
          msg: 'Somente valores padrões deve ser preenchidos.'
        },
        isLowercase: { msg: 'Deve ser escreto em caixa baixa.' },
        isAlpha: { msg: 'Somente permitido letras.'}
      }
    }
  }, {
    sequelize,
    modelName: 'Pessoas',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    version: true,
    paranoid: true,
    defaultScope: { where: {} },
    scopes: {
      ativo: { where: { ativo: true } },
      nao_ativo: { where: { ativo: false } },
      estudante: { where: { role: 'estudante', ativo: true } },
      docente: { where: { role: 'docente', ativo: true } },
      apagado: { where: { deletedAt: { [Op.not]: null  } } }
    }
  });
  return Pessoas;
};