const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require('dotenv').config();


const secrteKey = process.env.SECRTE_KEY;
const port = process.env.PORT

const app = express();
app.use(express.json())
// app.use(express.static("src"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use(
    session({
        secret: secrteKey, //a secret key used to encrypt  the session cookie
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        }, // set the session cookie properties
    })
);
app.use("/api", require("./Router/postRoutes"));
app.use("/get", require("./Router/getRoutes"));
app.use("/put",require("./Router/updateRoutes"))
app.use("/del", require("./Router/deleteRoutes"));
app.listen(port, () => {
    console.log(`Server in running on port ${port}`)
})
