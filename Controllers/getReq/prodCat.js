const dataBase = require("../../Config/dataBase");

exports.productCategoryAll = async (req, res) => {
    const sqlQurey = `SELECT prodcat_id,prodcat_name,prodcat_active As prodcat_Status,prodcat_added_at AS RegDate FROM  tbl_products_categories WHERE prodcat_deleted = 0`;
    await dataBase.query(sqlQurey, (error, response) => {
        if (error) return res.status(400).json({ success: false, message: "Something Went Wrong", error });
        return res.status(200).json({ success: true, message: "ok", response });
    })
}