const Sequelize = require('sequelize')
const sequelize = require(`../../config/sequelize`)

const Member = sequelize.define("members", {
    username: Sequelize.STRING,
    gender: Sequelize.STRING,
    birth: Sequelize.DATEONLY,
}, {
        freezeTableName: false,
        timestamps: true
    }
)
Member.sync({
    force: false,
}).then(function () {
    console.log('Model Member is Ok');
}).catch(function (err) {
    console.log('Model Member Err : ', err)
})

module.exports = Member