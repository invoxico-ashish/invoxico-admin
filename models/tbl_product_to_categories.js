module.exports = (sequelize, DataTypes) => {
  const prodToCategory = sequelize.define("tbl_product_to_categories", {
    id: {
      type: DataTypes.INTEGER(11),
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    ptc_prod_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ptc_cate_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: false
  })
  return prodToCategory;
}
