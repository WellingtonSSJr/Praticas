const Sequelize = require('sequelize')

const dbConexao = require('../conexao')

const Usuario = dbConexao.define('usuario', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allownull: false,
        unique: true
    },
    nome: {
        type: Sequelize.STRING,
        allownull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allownull: true
    },
    password: {
        type: Sequelize.STRING,
        allownull: false
    },
    data: {
        type: Sequelize.STRING,
        allownull: true
    }
});

Usuario.sync({force: false})
.then(()=>{
    console.log('Tabela criada USUARIO com sucesso')
})

module.exports = Usuario;