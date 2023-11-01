const db = require("../models")
const { Op } = require("sequelize");
const Products = db.Products;
const ProdToTag = db.ProdToTag;
const prodToCate = db.prodToCate;
const attachments = db.AttachRec
const mod_key = process.env.ATTACHMENT_RECORD_MODULE_ID_PRODUCTS;



const addProduct = async (req, res) => {
    const product_img = req.files
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
        console.log(product_id)
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
                        console.log(addTotag)
                        if (addTotag.length > 0) {
                            if (product_img.length > 0) {
                                try {
                                    const deleteAttachments = await attachments.destroy({
                                        where: {
                                            [Op.and]: [
                                                {
                                                    afile_record_id: product_id
                                                },
                                                {
                                                    afile_type: mod_key
                                                }
                                            ]
                                        }
                                    })
                                    const dataToAttachment = product_img.map((image) => ({
                                        afile_type: mod_key,
                                        afile_record_id: product_id,
                                        afile_physical_path: image.filename,
                                        afile_name: image.originalname,
                                    }));
                                    const addToAttachment = await attachments.bulkCreate(dataToAttachment);
                                    return res.status(200).json({ success: true, message: "product update successfully", updateProduct })
                                } catch (error) {
                                    console.log(error)
                                    return res.status(400).json({ success: false, message: "something went wrong", error: error.message })
                                }
                            } else {
                                return res.status(200).json({ success: true, message: "product update successfully", updateProduct })
                            }
                        }
                        else {
                            return res.status(400).json({ success: false, message: "something went wrong" })
                        }
                    }
                }
            } catch (error) {
                console.log(error)
                return res.status(400).json({ success: false, message: "Something went wrong", error: error.message })
            }
        } else {
            return res.status(400).json({ success: false, messsage: "Data is required" })
        }
    } else {
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
                return res.status(201).json({ success: true, messsage: "product add successfully", addProduct, addToTag, addToCate })
            } catch (error) {
                console.log(error)
                return res.status(400).json({ success: false, messsage: "Something went Wrong", error: error.message })
            }
        } else
            return res.status(400).json({ success: false, messsage: "data is requried" })
    }
}
const allProducts = async (req, res) => {
    try {
        const products = await Products.findAll({
            include: [
                {
                    model: ProdToTag,
                    as: 'product_tag'
                },
                {
                    model: prodToCate,
                    as: "product_category"

                }
            ],
            where: {
                product_delete: 0
            },
            // attributes:["product_id"]
        });
        return res.status(200).json({ success: true, message: "success", products })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Something went wrong", error: error.message })
    }

}
const singleProduct = async (req, res) => {
    const id = req.params.id
    if (id) {
        try {
            const Product = await Products.findOne({
                include: [
                    {
                        model: ProdToTag,
                        as: 'product_tag'
                    },
                    {
                        model: prodToCate,
                        as: "product_category"

                    }
                ],
                where: {
                    [Op.and]: [
                        {
                            product_delete: 0
                        },
                        {
                            product_id: id
                        },
                    ]
                },
                // attributes:[]
            });
            if (Product === null) {
                return res.status(200).json({ success: true, message: "no record is present with this id", Product })
            }
            return res.status(200).json({ success: true, message: "success", Product })
        } catch (error) {
            return res.status(400).json({ success: false, message: "Something went wrong", error: error.message })
        }
    }
    return res.status(400).json({ success: false, message: "no record found / id is required" })
}
const deleteSingleProduct = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const deleteProduct = await Products.update({
                product_delete: 1
            },
                {
                    where: {
                        product_id: id
                    }
                });
            if (deleteProduct.length > 0) {
                return res.status(200).json({ success: true, message: "deleted successfully", deleteProduct })
            }
        } catch (error) {
            console.log(error);
            return res.status(404).json({ success: false, message: "something went wrong", error: error.message })
        }
    }
    return res.status(404).json({ success: false, message: "no record found" })

}
const changestatusSingleProduct = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const product_status = req.body.product_status
    if (id && (product_status || product_status === 0)) {
        try {
            const changeStatus = await Products.update(
                {
                    product_status: product_status
                },
                {
                    where: {
                        product_id: id
                    }
                })
            return res.status(200).json({ success: true, message: "status change successfully", changeStatus });
        } catch (error) {
            return res.status(400).json({ success: false, message: "Something went wrong", error: error.message });
        }

    }
    else {
        return res.status(400).json({ success: false, message: "no record found/ id is required" });
    }
}
const filterByName = async (req, res) => {
    const inputname = req.body.product_name;
    console.log(inputname)
    if (inputname) {
        try {
            const response = await Products.findAll({
                include: [
                    {
                        model: ProdToTag,
                        as: 'product_tag'
                    },
                    {
                        model: prodToCate,
                        as: "product_category"

                    }
                ],
                where: {
                    [Op.and]: [
                        {
                            product_name: {
                                [Op.like]: `%${inputname}%`
                            }
                        },
                        {
                            product_delete: 0
                        }
                    ]
                }
            })
            return res.status(200).json({ success: true, message: "success", response })
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error: error.message })
        }
    }
    return res.status(400).json({ success: false, message: "input is required" })

}
const filterProductByStatus = async (req, res) => {
    const product_status = req.body.product_status;
    if (product_status || product_status === 0) {
        const products = await Products.findAll({
            include: [
                {
                    model: ProdToTag,
                    as: 'product_tag'
                },
                {
                    model: prodToCate,
                    as: "product_category"

                }
            ],
            where: {
                [Op.and]: [
                    {
                        product_delete: 0
                    },
                    {
                        product_status: product_status
                    }
                ]
            }
        });
        return res.status(200).json({ success: true, message: "success", products })

    }
    return res.status(400).json({ success: false, message: "status is required" })
}
const deleteMultipleStatus = async (req, res) => {
    const ids = req.body.product_id;
    console.log(ids.length);
    if (ids.length > 0) {
        try {
            const product = await Products.update(
                {
                    product_delete: 1,
                },
                {
                    where: {
                        product_id: ids,
                    },
                },
            );
            return res.status(200).json({ success: true, message: "successfully deleted", product });
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error: error.message });
        }
    }
    else {
        return res.status(400).json({ success: false, message: "id is required" });
    }
}
const changeProductsStatusMultiple = async (req, res) => {
    const ids = req.body.product_id;
    const product_status = req.body.product_status
    console.log(ids, product_status)
    // return false  
    if (ids.length > 0 && (product_status || product_status === 0)) {
        try {
            const products = await Products.update(
                {
                    product_status: product_status,
                },
                {
                    where: {
                        product_id: ids
                    }
                }
            );
            if (products.length > 0) {
                return res.status(200).json({ success: true, message: "successfully updated status", products })
            }
            return res.status(400).json({ success: false, message: "no operation perfomed" })
        } catch (error) {
            console.log(error, "error")
        }

    }
    return res.status(400).json({ success: false, message: "id is requried" })
}
module.exports =
{
    addProduct, deleteSingleProduct, changestatusSingleProduct, deleteMultipleStatus,
    allProducts, singleProduct, filterByName, filterProductByStatus, changeProductsStatusMultiple
}
