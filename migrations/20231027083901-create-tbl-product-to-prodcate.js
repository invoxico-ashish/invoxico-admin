'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_product_to_categories', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      ptc_prod_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      ptc_cate_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_product_to_categories');
  }
};

