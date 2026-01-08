'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.belongsToMany(models.Product, { through: models.OrderItem, foreignKey: 'orderId' });
    }
  }
  Order.init({
    total_amount: DataTypes.INTEGER,
    pay_status: DataTypes.ENUM('pending', 'paid', 'fail')
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};