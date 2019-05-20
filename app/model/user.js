var Sequelize = require('sequelize')
// const Model = Sequelize.Model;
var sequelize = require(`${global.appRoot}/config/sequelize`)
// class User extends Model { }

var User = sequelize.define(users, {
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    // permission: Sequelize.STRING,
    // timestamp: Sequelize.DATE,
}, {
        freezeTableName: false,
        timestamps: true
    }
)
User.sync({
    force: false,
}).then(function () {
    console.log('Model User is Ok');
}).catch(function (err) {
    console.log('Model User Err : ', err)
})

module.exports = User