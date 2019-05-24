const Sequelize = require('sequelize')
const sequelize = require(`../../config/sequelize`)
const bcrypt = require("bcrypt")

const User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
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

module.exports = User