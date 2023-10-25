'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_admins', {
      admin_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin_username: {
        type: Sequelize.STRING(100),
        index: true,
        allowNull: false,
      },
      admin_password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      admin_email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      admin_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      admin_status: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
      },
      admin_added: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_admins');
  }
};