const Sequelize = require('sequelize')
const sequelize = require(`../../config/sequelize`)

const AccessToken = sequelize.define("access_tokens", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    accesstoken: { type: Sequelize.STRING, allowNull: false },
    accessTokenExpiresAt: Sequelize.DATE,
    scope: Sequelize.STRING,
    user: { type: Sequelize.STRING, allowNull: false },
    client: { type: Sequelize.STRING, allowNull: false },
})

AccessToken.prototype.findByUserIdAndClientId = async function (user_id, client_id) {
    return await AccessToken.find({ where: { user: user_id, client: client_id } })
}

AccessToken.sync({
    force: false,
}).then(function () {
    console.log('Model access_token is Ok');
}).catch(function (err) {
    console.log('Model access_token Err : ', err)
})

module.exports = AccessToken