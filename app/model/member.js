const Sequelize = require('sequelize')
const sequelize = require(`../../config/sequelize`)

const Member = sequelize.define("members", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    birth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
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