const { DataTypes } = require('sequelize');
const db = require('../db/conn'); // Conexão com o banco de dados

const Aluno = db.define('Alunos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  disponibilidade: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  turma: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true, // Usar o nome da tabela conforme definido, sem pluralizar
  timestamps: false, // Evitar colunas createdAt e updatedAt
});

module.exports = Aluno;
