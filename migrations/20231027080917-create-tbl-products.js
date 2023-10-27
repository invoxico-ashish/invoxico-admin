'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_products', {
      product_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      product_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      product_SKU_no: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      product_Brand_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      product_QTY: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      product_regular_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      product_sale_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: null
      },
      product_length: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      product_width: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      product_height: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      product_weight: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
      },
      product_status: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
      product_delete: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      product_description: {
        type: Sequelize.TEXT({ length: 'long' }),
        allowNull: false,
      },
      product_short_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      product_added_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      product_updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_products');
  }
};