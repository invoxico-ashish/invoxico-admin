'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_brands', {
      brand_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      brand_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      brand_slug: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      brand_featured: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      brand_status: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
      brand_deleted: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      brand_added_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      brand_updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_brands');
  }
};