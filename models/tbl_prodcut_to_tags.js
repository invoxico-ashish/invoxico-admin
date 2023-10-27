module.exports = (sequelize, DataTypes) => {
  const prodToCategory = sequelize.define("tbl_prodcut_to_tags", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    ptc_prod_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ptc_tag_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    timestamps: false
  })
  return prodToCategory;
}
