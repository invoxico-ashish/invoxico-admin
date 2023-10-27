module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("tbl_products", {
    product_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    product_SKU_no: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    product_Brand_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    product_QTY: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    product_regular_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    product_sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: null
    },
    product_length: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    product_width: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    product_height: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    product_weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    product_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1
    },
    product_delete: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    product_description: {
      type: DataTypes.TEXT({ length: 'long' }),
      allowNull: false,
    },
    product_short_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    createdAt: "product_added_at",
    updatedAt: "product_updated_at"
  });
  return Products
}