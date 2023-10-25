'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_admin.init({
    admin_username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbl_admin',
  });
  return tbl_admin;
};