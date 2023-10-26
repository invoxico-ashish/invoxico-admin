module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define("tbl_brands", {
    brand_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    brand_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    brand_slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    brand_featured: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    brand_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1
    },
    brand_deleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    createdAt: "brand_added_at",
    updatedAt: "brand_updated_at"
  });
  Brand.associate = (models) => {
    // Define a one-to-one association with AttachRec
    Brand.belongsTo(models.tbl_attachment_records, {
      foreignKey: 'afile_record_id',
      as: 'attachmentRecord', // Alias for the association
    });
  };
  return Brand;
}