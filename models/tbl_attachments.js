module.exports = (sequelize, DataTypes) => {
  const attachmentRecord = sequelize.define("tbl_attachments", {
    afile_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    afile_type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    afile_record_id: {
      type: DataTypes.INTEGER(11),
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
    updatedAt: "record_updated_at",
    indexes:[
      {
        name:"composite_index",
        fields:["afile_id","afile_type","afile_record_id"],
        unique:true
      } 
    ]
  });

  return attachmentRecord;
};