const Sequelize = require('sequelize')
const dotenv = require('dotenv/config')



const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbNPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST

const conexao = new Sequelize(dbName, dbUser, dbNPassword, {
    host: dbHost,
    dialect: 'mysql',
})

module.exports = conexao;