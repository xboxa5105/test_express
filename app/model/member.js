const Sequelize = require('sequelize')
// const Model = Sequelize.Model;
const sequelize = require(`../../config/sequelize`)
// class User extends Model { }

const Member = sequelize.define("members", {
    username: Sequelize.STRING,
    gender: Sequelize.STRING,
    birth: Sequelize.DATEONLY,
    // birth_month: Sequelize.DATE,
    // birth_date: Sequelize.DATE,
    // timestamp: Sequelize.DATE,
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