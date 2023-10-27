module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define("tbl_products_tag", {
      prodtag_id: {
          type: DataTypes.INTEGER(11),
          primaryKey: true,
          autoIncrement: true,
          unique: true
      },
      prodtag_name: {
          type: DataTypes.STRING(1000),
          allowNull: false,
      },
      prodtag_active: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue:1
      },
      prodtag_delete: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue:0
      },
  }, {
      createdAt: "prodctag_added_at",
      updatedAt: "prodtag_updated_at"
  });
  return Tags
}