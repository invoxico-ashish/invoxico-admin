const dataBase = require("../Config/dataBase")


exports.Prodcate = async (req, res) => {
    let prodCatName = req.body.prodCatName;
    let prodCatParent = req.body.prodCatParent;
    let prodCatIsFeatured = req.body.prodCatIsFeatured;
    let prodCatActive = req.body.prodCatStatus;
    let dataToInsert = [prodCatName, prodCatParent, prodCatIsFeatured, prodCatActive];
    const sqlQuery = `INSERT INTO tbl_products_categories (prodcat_name,prodcat_parent,prodcat_is_featured,prodcat_active) VALUES (?,?,?,?)`;
    const sqlQueryTwo = `UPDATE tbl_products_categories SET prodcat_name = ?, prodcat_parent = ?, prodcat_is_featured = ?, prodcat_active = ?, prodcat_updated_at = now() WHERE prodcat_id = ?`;
    if (!prodCatName || !prodCatParent || !prodCatIsFeatured || !prodCatActive) {
        return res.status(204).json({ success: false, message: "Content is Required" });
    };
    if (req.body.prodcatId) {
        let id = req.body.prodcatId
        let dataToUpdate = [prodCatName, prodCatParent, prodCatIsFeatured, prodCatActive, id];
        console.log(dataToUpdate, "dataToUpdate");
        // return
        await dataBase.query(sqlQueryTwo, dataToUpdate, (err, result) => {
            if (err) return res.status(400).json({ success: false, message: "failed", err });
            return res.status(200).json({ success: true, message: "Updated successfully", result });
        });
    }
    if (!req.body.prodcatId) {
        console.log(dataToInsert, "dataToInsert")
        // return
        await dataBase.query(sqlQuery, dataToInsert, (error, response) => {
            if (error) return res.status(400).json({ success: false, message: "Something went wrong", error });
            return res.status(200).json({ success: true, message: "Successfully inserted", response });
        });
    }
};
exports.ProdCateDelByID = async (req, res) => {
    const id = req.params.id;
    const sqlQuery = `UPDATE tbl_products_categories SET prodcat_deleted = 1, prodcat_updated_at = now() WHERE prodcat_id = ${id}`;
    if (!id) {
        return res.status(404).json({ success: false, message: "not found or id is required" });
    }
    await dataBase.query(sqlQuery, (err, response) => {
        if (err) return res.status(400).json({ success: false, message: "Something went wrong", err });
        return res.status(200).json({ success: true, message: "Deleted", response });
    });
};
exports.UpdateProdCateById = async (req, res) => {
    const id = req.params.id;
    let prodCatName = req.body.prodCatName;
    let prodCatParent = req.body.prodCatParent;
    let prodCatIsFeatured = req.body.prodCatIsFeatured;
    let prodCatActive = req.body.prodCatStatus;
    const dataToInsert = [prodCatName, prodCatParent, prodCatIsFeatured, prodCatActive, id];
    const sqlQuery = `UPDATE tbl_products_categories SET prodcat_name = ?, prodcat_parent = ?, prodcat_is_featured = ?, prodcat_active = ?, prodcat_updated_at = now() WHERE prodcat_id = ?`;
    if (!prodCatName || !prodCatParent || !prodCatIsFeatured || !prodCatActive) {
        return res.status(204).json({ success: false, message: "Content is Required" });
    };
    await dataBase.query(sqlQuery, dataToInsert, (err, result) => {
        if (err) return res.status(400).json({ success: false, message: "failed", err });
        return res.status(200).json({ success: true, message: "Updated successfully", result });
    });
};
exports.singleProdCateById = async (req, res) => {
    const id = req.params.id;
    const sqlQuery = `SELECT prodcat_id AS prodcatId,prodcat_name AS prodCatName,prodcat_parent AS prodCatParent,prodcat_is_featured AS prodCatIsFeatured,prodcat_active AS prodCatStatus FROM  tbl_products_categories WHERE prodcat_id = ${id}`;
    await dataBase.query(sqlQuery, (err, response) => {
        if (err) return res.status(400).json({ success: false, message: "Something went wrong", err });
        return res.status(200).json({ success: true, message: "Successfully fetched", response });
    })
}
exports.productCategoryAll = async (req, res) => {
    const sqlQurey = `SELECT prodcat_id AS prodcatId,prodcat_name AS prodCatName,prodcat_active As prodCatStatus,prodcat_added_at AS RegDate FROM  tbl_products_categories WHERE prodcat_deleted = 0`;
    await dataBase.query(sqlQurey, (error, response) => {
        if (error) return res.status(400).json({ success: false, message: "Something Went Wrong", error });
        return res.status(200).json({ success: true, message: "ok", response });
    });
};
exports.deleteMultipleCateById = async (req, res) => {
    const ids = req.body.prodcatId;
    console.log(ids);
    // return
    const sqlQuery = `UPDATE tbl_products_categories SET prodcat_deleted = 1 WHERE prodcat_id IN (?)`;
    dataBase.query(sqlQuery, [ids], (error, result) => {
        if (error) return res.status(400).json({ success: false, message: "Something Went Wrong", error });
        return res.status(200).json({ success: true, message: "deleted successfully", result });
    });
};
exports.UpdateProdCateStatus = async (req, res) => {
    const id = req.params.id;
    let prodCatActive = req.body.prodCatStatus;
    const sqlQuery = `UPDATE tbl_products_categories SET prodcat_active = ? WHERE prodcat_id = ?`;
    const dataToUpdate = [prodCatActive, id];
    console.log(dataToUpdate);
    return
    await dataBase.query(sqlQuery, dataToUpdate, (err, result) => {
        if (err) return res.status(400).json({ success: false, message: "Something Went Wrong", err });
        return res.status(200).json({ success: true, message: "ok", result });
    })
}
