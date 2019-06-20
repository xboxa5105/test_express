const Sequelize = require('sequelize')
const sequelize = require(`../../config/sequelize`)
const Order = require('./order')

const OrderMember = sequelize.define("order_members", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    member: {
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
        //         OrderMember.belongsTo(models.Order);
        //     }
        // }
    }
)

OrderMember.belongsTo(Order, {
    foreignKey: 'order_id',
    // constraints: false,
    as: 'order_member'
});

// OrderMember.associate = function (models) {
//     OrderMember.belongsTo(models.Order, {
//         foreignKey: 'order_id',
//         // constraints: false,
//         // as: 'order'
//       });
// }

// OrderMember.sync({
//     force: false,
// }).then(function () {
//     console.log('Model OrderMember is Ok');
// }).catch(function (err) {
//     console.log('Model OrderMember Err : ', err)
// })

module.exports = OrderMember