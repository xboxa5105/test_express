'use strict';
const sequelize = require(`../../config/sequelize`)

const Client = require('./client');
const AccessToken = require('./access_token');
const AuthorizationCode = require('./authorization_code');
const User = require(`./user`)
const Member = require(`./member`)
const RefreshToken = require(`./refresh_token`)
const Order = require(`./order`)
const OrderMember = require(`./order_member`)
const OrderEvent = require(`./order_event`)

Order.hasMany(OrderMember, {
  foreignKey: 'order_id',
  as: 'OrderMembers'
});
Order.hasMany(OrderEvent, {
  foreignKey: 'order_id',
  as: 'OrderEvents'
});

OrderMember.belongsTo(Order, {
  foreignKey: 'order_id',
  // constraints: false,
  as: 'Order'
});
OrderEvent.belongsTo(Order, {
  foreignKey: 'order_id',
  // constraints: false,
  as: 'Order'
});

sequelize.sync({
      force: false,
  }).then(function () {
      console.warn('Model is Ok');
  }).catch(function (err) {
      console.error('Model Err : ', err)
  })

module.exports = {
  User,
  Member,
  Client,
  AccessToken,
  AuthorizationCode,
  RefreshToken,
  Order,
  OrderMember,
  OrderEvent
};