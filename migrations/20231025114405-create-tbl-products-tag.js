'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_products_tags', {
      prodtag_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prodtag_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      prodtag_active: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      prodtag_delete: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      prodctag_added_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      prodtag_updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_products_tags');
  }
};