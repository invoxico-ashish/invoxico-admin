'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_prodcut_to_tags', {
      id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      ptc_prod_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      ptc_tag_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_prodcut_to_tags');
  }
};