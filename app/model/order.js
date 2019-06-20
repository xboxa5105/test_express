const Sequelize = require('sequelize')
const sequelize = require(`../../config/sequelize`)
// const OrderMember = require('./order_member')
// const OrderEvent = require('./order_event')

const Order = sequelize.define("orders", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
    },
}, {
        freezeTableName: false,
        timestamps: true,
        // classMethods: {
        //     associate: function (models) {
        //         // OrderMember.belongsTo(models.Order);
        //         Order.hasMany(models);
        //         Order.hasMany(models);
        //     }
        // }
    }
)

// Order.hasMany(OrderMember, {
//     foreignKey: 'order_id',
//     as: 'OrderMembers'
// });
// Order.hasMany(OrderEvent, {
//     foreignKey: 'order_id',
//     as: 'OrderEvents'
// });

// Order.associate = function (models) {
// Order.hasMany('OrderMember', {
//     as: 'OrderMembers'
// });
// Order.belongsTo(models.OrderMember, {
//     as: 'OrderMembers'
// });
// Order.hasMany('OrderEvent', {
//     as: 'OrderEvents'
// })
// Order.belongsTo(models.OrderEvent, {
//     as: 'OrderEvents'
// });
// }

// Order.sync({
//     force: false,
// }).then(function () {
//     console.log('Model Order is Ok');
// }).catch(function (err) {
//     console.log('Model Order Err : ', err)
// })

module.exports = Order