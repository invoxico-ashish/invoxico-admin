const dataBase = require("../../Config/dataBase")


exports.Prodcate = async (req, res) => {
    let prodCatName = req.body.prodCatName;
    let prodCatParent = req.body.prodCatParent;
    let prodCatIsFeatured = req.body.prodCatIsFeatured;
    let prodCatActive = req.body.prodCatStatus;
    const dataToInsert = [prodCatName, prodCatParent, prodCatIsFeatured, prodCatActive];
    const sqlQuery = `INSERT INTO tbl_products_categories (prodcat_name,prodcat_parent,prodcat_is_featured,prodcat_active) VALUES (?,?,?,?)`
    if (!prodCatName || !prodCatParent || !prodCatIsFeatured || !prodCatActive) {
        return res.status(204).json({ success: false, message: "Content is Required" });
    };
    await dataBase.query(sqlQuery, dataToInsert, (error, response) => {
        if (error) return res.status(400).json({ success: false, message: "Something went wrong", error })
        return res.status(200).json({ success: true, message: "Successfully inserted", response });
    });
};
exports.ProdCateDelByID = async (req, res) => {
    const id = req.params.id;
    const dataToInsert = [prodCatName, prodCatParent, prodCatIsFeatured, prodCatActive];
    const sqlQuery = `UPDATE  tbl_products_categories SET prodcat_deleted = 1 WHERE prodcat_id = ${id}`;
    if (!prodCatName || !prodCatParent || !prodCatIsFeatured || !prodCatActive) {
        return res.status(400).json({ success: false, message: "fields are required" });
    }
    await dataBase.query(sqlQuery, dataToInsert, (err, response) => {
        if (err) return res.status(400).json({ success: false, message: "Something went wrong", err });
        return res.status(200).json({ success: true, message: "Deleted", response });
    });
}
exports.UpdateProdCateById = async (req, res) => {
    const id = req.params.id;
    let prodCatName = req.body.prodCatName;
    let prodCatParent = req.body.prodCatParent;
    let prodCatIsFeatured = req.body.prodCatIsFeatured;
    let prodCatActive = req.body.prodCatStatus;
    const dataToInsert = [prodCatName, prodCatParent, prodCatIsFeatured, prodCatActive,id];
    // const sqlQuery = `UPDATE tbl_products_categories SET prodcat_name = ?, prodcat_parent = ?, prodcat_is_featured = ?, prodcat_active = ?, WHERE prodcat_id = ${id}`;
    const sqlQuery = `UPDATE tbl_products_categories SET prodcat_name = ?, prodcat_parent = ?, prodcat_is_featured = ?, prodcat_active = ? WHERE prodcat_id = ?`;
    console.log(dataToInsert)
    // return
    if (!prodCatName || !prodCatParent || !prodCatIsFeatured || !prodCatActive) {
        return res.status(204).json({ success: false, message: "Content is Required" });
    };
    await dataBase.query(sqlQuery, dataToInsert, (err, result) => {
        if (err) return res.status(400).json({ success: false, message: "failed", err });
        return res.status(200).json({ success: true, message: "Updated successfully", result })
    })
}
exports.singleProdCateById = async(req,res)=>{
    console.log("first")
}
