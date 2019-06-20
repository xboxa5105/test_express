const Sequelize = require('sequelize')
const sequelize = require(`../../config/sequelize`)
const AuthorizationCode = sequelize.define("authorization_codes", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    authorization_code: { type: Sequelize.STRING, allowNull: false },
    expires: Sequelize.DATE,
    redirect_uri: { type: Sequelize.STRING, allowNull: false },
    scope:  Sequelize.STRING,
    userId: { type: Sequelize.STRING, allowNull: false },
    clientId: { type: Sequelize.STRING, allowNull: false }
});

// AuthorizationCode.sync({
//     force: false,
// }).then(function () {
//     console.log('Model authorization_code is Ok');
// }).catch(function (err) {
//     console.log('Model authorization_code Err : ', err)
// })

module.exports = AuthorizationCode