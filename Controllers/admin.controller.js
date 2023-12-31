// const dataBase = require("../Config/dataBase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const db = require("../models");
const Admin = db.admin


const loginAdmin = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const usernameRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const secrteKey = process.env.JWT_SECRTE_KEY;
    if (userName && password) {
        if (usernameRegex.test(userName) && passwordRegex.test(password)) {
            try {
                const admin = await Admin.findOne({
                    attributes: ["admin_id", "admin_password", "admin_username", "admin_status"]
                },
                    {
                        where:
                            { admin_username: userName },
                    })

                if (admin) {
                    const adminPassword = admin.dataValues.admin_password;
                    const username = admin.dataValues.admin_username;
                    const userId = admin.dataValues.admin_id;
                    const userStatus = admin.dataValues.admin_status;
                    const userData = { userId, username, userStatus };
                    const matchPassword = await bcrypt.compare(password, adminPassword);
                    if (matchPassword) {
                        const token = jwt.sign({ username, userId }, secrteKey, { expiresIn: "2h" })
                        res.cookie('token', token, { httpOnly: true });
                        return res.status(200).json({ success: true, message: "user login SuccesFully", token, userData })
                    } else {
                        return res.status(401).json({ success: false, message: "Incorrect password" })
                    };
                } else {
                    return res.status(404).json({ success: false, message: "User not found" })
                };
            } catch (error) {
                return res.status(400).json({ success: false, message: "User not found", error: error.message })
            };
        } else {
            return res.status(401).json({ success: false, message: "Invalid Username" })
        };
    }
    else {
        return res.status(401).json({ success: false, message: "userName & password are required" })
    };
};

module.exports = { loginAdmin };















// exports.signUpUser = async (req, res) => {
//     const userName = req.body.admin_username;
//     const password = req.body.admin_password;
//     const email = req.body.admin_email;
//     const name = req.body.name;
//     const saltRounds = 10;
//     const confirmPassword = req.body.confirmPassword;
//     const usernameRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     const sqlQueryOne = `SELECT * FROM tbl_admin WHERE admin_username = ? `;
//     const sqlQueryTwo = `INSERT INTO tbl_admin (admin_username,admin_password,admin_email,admin_name) VALUES (?,?,?,?) `
//     if (userName && password) {
//         if (password === confirmPassword) {
//             if (usernameRegex.test(userName) && passwordRegex.test(password)) {
//                 await dataBase.query(sqlQueryOne, [userName], (error, response) => {
//                     if (response.length > 0) {
//                         return res.status(400).json({ success: false, message: "user already register" })
//                     } else {
//                         bcrypt.genSalt(saltRounds, (saltError, salt) => {
//                             if (saltError) {
//                                 return res.status(500).json({ success: false, message: 'Error generating salt' });
//                             }
//                             bcrypt.hash(password, salt, async function (hashError, hash) {
//                                 if (hashError) {
//                                     return res.status(400).json({ success: false, message: "Something went wrong", hashError })
//                                 }
//                                 const data = [userName, hash, email, name]
//                                 await dataBase.query(sqlQueryTwo, data, (error, result) => {
//                                     if (error) {
//                                         return res.status(400).json({ success: false, message: "Some Error Occurred", error })
//                                     }
//                                     return res.status(200).json({ success: true, message: "Success", result })
//                                 })

//                             })
//                         })

//                     }
//                 })
//             } else { return res.status(400).json({ success: false, message: "wrong username or password" }) }
//         }
//         else { return res.status(403).json({ success: false, message: "password does not match" }) }
//     } else { return res.status(400).json({ success: false, message: "Creadentials are required" }) }
// }
