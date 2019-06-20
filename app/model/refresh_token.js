const Sequelize = require('sequelize')
const sequelize = require(`../../config/sequelize`)

const RefreshToken = sequelize.define("refresh_tokens", {
    refreshtoken: { type: Sequelize.STRING, required: true },
    refreshTokenExpiresAt: Sequelize.DATE,
    scope: Sequelize.STRING,
    user: { type: Sequelize.STRING, required: true },
    client: { type: Sequelize.STRING, required: true },
})
// RefreshToken.sync({
//     force: false,
// }).then(function () {
//     console.log('Model refresh_token is Ok');
// }).catch(function (err) {
//     console.log('Model refresh_token Err : ', err)
// })

module.exports = RefreshToken