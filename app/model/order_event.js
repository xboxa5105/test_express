const Sequelize = require('sequelize')
const sequelize = require(`../../config/sequelize`)
// const Order = require('./order')

const OrderEvent = sequelize.define("order_events", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    event: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    // order_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     foreignKey: true,
    //     primaryKey: true,
    //     references: {
    //         model: Order, // Can be both a string representing the table name or a Sequelize model
    //         key: 'id'
    //     }
    // }
}, {
        freezeTableName: false,
        timestamps: true,
        // classMethods: {
        //     associate: function (models) {
        //         OrderEvent.belongsTo(models.Order); 
        //     }
        // }
    }
)

// OrderEvent.belongsTo(Order, {
//     foreignKey: 'order_id',
//     // constraints: false,
//     as: 'order_event'
// });

// OrderEvent.associate = function (models) {
//     OrderEvent.belongsTo(models.Order, {
//         foreignKey: 'order_id',
//         // constraints: false,
//         // as: 'order'
//       });
// }

// OrderEvent.sync({
//     force: false,
// }).then(function () {
//     console.log('Model OrderEvent is Ok');
// }).catch(function (err) {
//     console.log('Model OrderEvent Err : ', err)
// })

module.exports = OrderEvent