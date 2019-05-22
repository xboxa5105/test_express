var Sequelize = require('sequelize')
// const Model = Sequelize.Model;
var sequelize = require(`${global.appRoot}/config/sequelize`)
var bcrypt = require("bcrypt")
// class User extends Model { }

var User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    // permission: Sequelize.STRING,
    // timestamp: Sequelize.DATE,
}, {
        freezeTableName: false,
        timestamps: true,
        hooks: {
            beforeCreate: (user, options) => {
                return bcrypt.hash(user.password, 5).then(hashedPw => {
                    user.password = hashedPw;
                });
            }
        }
    }
)
User.sync({
    force: false,
}).then(function () {
    console.log('Model User is Ok');
}).catch(function (err) {
    console.log('Model User Err : ', err)
})

// bcrypt.genSalt(5, function (err, salt) {
//     if (err) return callback(err);

//     bcrypt.hash(user.password, salt, null, function (err, hash) {
//         if (err) return callback(err);
//         user.password = hash;
//         callback();
//     })
// })

module.exports = User