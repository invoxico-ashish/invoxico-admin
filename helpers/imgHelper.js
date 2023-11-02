const multer = require("multer");

const brandStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Brand_img");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${file.originalname}`);
    },
});
const upload = multer({ storage: brandStorage });

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Product_img");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${file.originalname}`);
    },
});
const Prod_upload = multer({ storage: productStorage });



module.exports = { upload, Prod_upload };
