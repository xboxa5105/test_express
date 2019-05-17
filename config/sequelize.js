const Sequelize = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: '3306',
    pool: {
        idle: 1,
        min: 20,
        max: 30,
    }
})
module.exports = sequelize