var Sequelize = require('sequelize')
// const Model = Sequelize.Model;
var sequelize = require(`${global.appRoot}/config/sequelize`)
// class User extends Model { }

var Member = sequelize.define("members", {
    username: Sequelize.STRING,
    gerder: Sequelize.STRING,
    birth_year: Sequelize.INTEGER,
    birth_month: Sequelize.INTEGER,
    birth_date: Sequelize.INTEGER,
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