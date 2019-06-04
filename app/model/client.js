const Sequelize = require('sequelize')
const sequelize = require(`../../config/sequelize`)

const Client = sequelize.define("clients", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clientId: { type: Sequelize.STRING, unique: true, allowNull: false },
    clientSecret: { type: Sequelize.STRING, allowNull: false },
    redirectUri: Sequelize.STRING,
    grants: Sequelize.STRING,
})
Client.sync({
    force: false,
}).then(function () {
    console.log('Model client is Ok');
}).catch(function (err) {
    console.log('Model client Err : ', err)
})

module.exports = Client