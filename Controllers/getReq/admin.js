const dataBase = require("../../Config/dataBase");

exports.admin = async (req, res) => {
    const sqlQueryOne = `SELECT * FROM tbl_admin`
    await dataBase.query(sqlQueryOne, (error, result) => {
        if (error) return res.status(400).json({ success: false, message: "Something went wrong", error })
        return res.status(200).json({ success: true, message: "ok", result })
    })
}

