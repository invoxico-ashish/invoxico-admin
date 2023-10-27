const db = require("../models")
const { Op } = require("sequelize");
const Products = db.Products;
const ProdToTag = db.ProdToTag;
const prodToCate = db.prodToCate;
const attachments = db.AttachRec
const mod_key = process.env.ATTACHMENT_RECORD_MODULE_ID_PRODUCTS;



const addProduct = async (req, res) => {
    const { product_img } = req.files
    console.log(product_img)
    const {
        product_name, product_SKU_no, product_Brand_id,
        product_QTY, product_regular_price, product_sale_price,
        product_length, product_width, product_height, product_weight,
        product_status, product_description, product_short_description,
        product_category, product_tag, product_id
    } = req.body
    console.log(req.body);
    const dataToInsert =
    {
        product_name: product_name, product_SKU_no: product_SKU_no,
        product_Brand_id: product_Brand_id, product_QTY: product_QTY,
        product_regular_price: product_regular_price, product_sale_price: product_sale_price,
        product_length: product_length, product_width: product_width,
        product_height: product_height, product_weight: product_weight,
        product_status: product_status, product_description: product_description,
        product_short_description: product_short_description,
    };
    if (product_id) {
        console.log("first")
        //update
        if (dataToInsert) {
            try {
                const updateProduct = await Products.update(dataToInsert, {
                    where: {
                        product_id: product_id
                    }
                });
                if (updateProduct.length > 0) {
                    const prodToCateupdate = { ptc_cate_id: product_category }
                    const prodToTag = { ptc_tag_id: product_tag }
                    const addToCate = await prodToCate.update(prodToCateupdate, {
                        where: {
                            ptc_prod_id: product_id
                        }
                    });
                    if (addToCate.length > 0) {
                        const addTotag = await ProdToTag.update(prodToTag, {
                            where: {
                                ptc_prod_id: product_id
                            }
                        })
                    }
                    console.log(addTotag)
                    res.send(addTotag);
                }
            } catch (error) {
                return res.status(400).json({ success: false, message: "Something went wrong", error: error.message })
            }
        } else {
            return res.status(400).json({ success: false, messsage: "Data is required" })
        }
    } else {
        console.log("here")
        // return/
        if (dataToInsert) {
            try {
                const addProduct = await Products.create(dataToInsert);
                const prod_id = addProduct.product_id;
                const dataToCate = { ptc_prod_id: prod_id, ptc_cate_id: product_category }
                const dataTotag = { ptc_prod_id: prod_id, ptc_tag_id: product_tag }
                const addToCate = await prodToCate.create(dataToCate);
                const addToTag = await ProdToTag.create(dataTotag);
                if (product_img) {
                    const dataToAttachment = product_img.map((image) => ({
                        afile_type: mod_key,
                        afile_record_id: prod_id,
                        afile_physical_path: image.filename,
                        afile_name: image.originalname,
                    }));
                    const addToAttachment = await attachments.bulkCreate(dataToAttachment);
                }
                return res.status(200).json({ success: true, messsage: "product add successfully", addProduct, addToTag, addToCate })
            } catch (error) {
                console.log(error)
                return res.status(400).json({ success: false, messsage: "Something went Wrong", error: error.message })
            }
        } else
            return res.status(400).json({ success: false, messsage: "data is requried" })
    }
}
module.exports = { addProduct }
