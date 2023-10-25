'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_products_categories', {
      prodcat_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prodcat_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      prodcat_parent: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      prodcat_is_featured: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      prodcat_active: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      prodcat_deleted: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      prodcat_added_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      prodcat_updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_products_categories');
  }
};