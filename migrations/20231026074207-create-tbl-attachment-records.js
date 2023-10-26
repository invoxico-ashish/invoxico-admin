'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_attachment_records', {
      afile_id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      afile_type: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      afile_record_id: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      afile_physical_path: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      afile_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      record_added_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      record_updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_attachment_records');
  }
};