const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const attachmentRecord = sequelize.define("tbl_attachment_records", {
    afile_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    afile_type: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    afile_record_id: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    afile_physical_path: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    afile_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    createdAt: "record_added_at",
    updatedAt: "record_updated_at"
  });
  attachmentRecord.associate = (models) => {
    // Define a one-to-one association with Brand
    attachmentRecord.belongsTo(models.tbl_brands, {
      foreignKey: 'afile_record_id',
      as: 'brand', // Alias for the association
    });
  };
  return attachmentRecord
}