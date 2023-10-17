const mysql = require("mysql");
const dataBase = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "",
    database: process.env.DB_DATABASE
})

dataBase.connect((err) => {
    if (!err) console.log("DataBase is connected")
    else console.log(err)
})
module.exports = dataBase