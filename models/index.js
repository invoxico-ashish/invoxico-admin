'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { Op, DataTypes } = require("sequelize");
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config, {
    logging: false,
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config, {
    logging: false,
  });
}
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.admin = require("../models/tbl_admin")(sequelize, DataTypes);
db.prodCate = require("../models/tbl_products_categories")(sequelize, DataTypes);
db.Tags = require("../models/tbl_products_tag")(sequelize, DataTypes);
db.Brand = require("../models/tbl_brands")(sequelize, DataTypes)
db.AttachRec = require("../models/tbl_attachment_records")(sequelize, DataTypes)
// db.sequelize.sync({ force: false }).then(() => {
//   console.log('yes re-sync done!');
// });
module.exports = db;
