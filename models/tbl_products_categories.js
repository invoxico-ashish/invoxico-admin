
module.exports = (sequelize, DataTypes) => {
  const ProdCate = sequelize.define("tbl_products_categories", {
      prodcat_id: {
          type: DataTypes.INTEGER(11),
          primaryKey: true,
          autoIncrement: true,
      },
      prodcat_name: {
          type: DataTypes.STRING(100),
          allowNull: false,
      },
      prodcat_parent: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
      },
      prodcat_is_featured: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 0
      },
      prodcat_active: {
          type: DataTypes.INTEGER(1),
          defaultValue: 1,
          allowNull: false,
      },
      prodcat_deleted: {
          type: DataTypes.INTEGER(1),
          defaultValue: 0,
      },
  }, {
      createdAt: "prodcat_added_at",
      updatedAt: "prodcat_updated_at"
  });
  return ProdCate;    
}