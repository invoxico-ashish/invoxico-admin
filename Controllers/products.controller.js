const db = require("../models")
const { Op } = require("sequelize");
const Products = db.Products;
const ProdToTag = db.ProdToTag;
const prodToCate = db.prodToCate;
const attachments = db.AttachRec
const Module_id = require("../config/moduleConfig")
const Validator = require("../helpers/validator")
const mod_key = Module_id.ATTACHMENT_RECORD_MODULE_ID_PRODUCTS

const addProduct = async (req, res) => {
    const product_img = req.files
    const {
        product_name, product_SKU_no, product_Brand_id,
        product_QTY, product_regular_price, product_sale_price,
        product_length, product_width, product_height, product_weight,
        product_status, product_description, product_short_description,
        product_category, product_tag, product_id
    } = req.body

    const dataToInsert = {
        product_name: product_name, product_SKU_no: product_SKU_no,
        product_Brand_id: product_Brand_id, product_QTY: product_QTY,
        product_regular_price: product_regular_price, product_sale_price: product_sale_price,
        product_length: product_length, product_width: product_width,
        product_height: product_height, product_weight: product_weight,
        product_status: product_status, product_description: product_description,
        product_short_description: product_short_description
    };
    let ValidData = Validator.validateProductData(dataToInsert);
    if (ValidData) {
        return res.status(400).json({ success: false, message: "fileds are required", ValidData })
    }
    else {
        let productTag = product_tag.split(",");
        let productCat = product_category.split(",");
        const undefinedFields = Object.keys(dataToInsert).filter((key) => dataToInsert[key] === undefined);
        if (undefinedFields.length > 0) {
            return res.status(400).json({ success: false, message: 'Some fields are undefined', undefinedFields: undefinedFields });
        }
        else {
            if (product_id) {
                if (dataToInsert) {
                    try {
                        const updateProduct = await Products.update(dataToInsert, {
                            where: {
                                product_id: product_id
                            }
                        });
                        if (updateProduct.length > 0) {
                            if (productCat && productCat.length > 0) {
                                const catAssociations = productCat.map((catId) => ({
                                    ptc_prod_id: product_id,
                                    ptc_cate_id: catId,
                                }));
                                const delOldCate = await prodToCate.destroy({
                                    where: {

                                        ptc_prod_id: product_id
                                    }
                                });
                                try {
                                    const addToCate = await prodToCate.bulkCreate(catAssociations);
                                    if (addToCate.length > 0) {
                                        if (productTag && productTag.length > 0) {
                                            const tagAssociations = productTag.map((tagId) => ({
                                                ptc_prod_id: product_id,
                                                ptc_tag_id: tagId,
                                            }));
                                            const delOldtag = await ProdToTag.destroy({
                                                where: {
                                                    ptc_prod_id: product_id
                                                }
                                            })
                                            const addToTag = await ProdToTag.bulkCreate(tagAssociations);

                                            if (addToTag.length > 0) {
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
            }
            else {
                if (dataToInsert) {
                    try {
                        const addProduct = await Products.create(dataToInsert);
                        const prod_id = addProduct.product_id;
                        if (productTag && productTag.length > 0) {
                            const tagAssociations = productTag.map((tagId) => ({
                                ptc_prod_id: prod_id,
                                ptc_tag_id: tagId,
                            }));
                            try {
                                const addToTag = await ProdToTag.bulkCreate(tagAssociations);
                                if (productCat && productCat.length > 0) {
                                    const catAssociations = productCat.map((catId) => ({
                                        ptc_prod_id: prod_id,
                                        ptc_cate_id: catId,
                                    }));
                                    try {
                                        const addToCate = await prodToCate.bulkCreate(catAssociations);
                                        if (product_img) {
                                            const dataToAttachment = product_img.map((image) => ({
                                                afile_type: mod_key,
                                                afile_record_id: prod_id,
                                                afile_physical_path: image.filename,
                                                afile_name: image.originalname,
                                            }));
                                            const addToAttachment = await attachments.bulkCreate(dataToAttachment);
                                            return res.status(201).json({ success: true, messsage: "product add successfully", addProduct })
                                        }
                                    } catch (error) {
                                        return res.status(400).json({ success: false, message: "Something went wrong in catId", error: error.message })
                                    }
                                }
                            } catch (error) {
                                return res.status(400).json({ success: false, message: "Something went wrong in tagId", error: error.message })
                            }
                        }
                    } catch (error) {
                        console.log(error)
                        return res.status(400).json({ success: false, messsage: "Something went Wrong", error: error.message })
                    }
                } else
                    return res.status(400).json({ success: false, messsage: "data is requried" })
            }
        }
    }


};
const products = async (req, res) => {
    const { limit, page, product_name, product_status } = req.body
    const totalCount = await Products.count({
        where: {
            product_delete: 0
        }
    });
    if (product_name || product_status || (product_status === 1 || product_status === 0)) {
        console.log("filter")
        if (product_status === 1 || product_status === 0) {
            let ProdPage = page || 1;
            let prodLimit = limit || 10;
            const offset = (ProdPage - 1) * prodLimit;
            try {
                const products = await Products.findAll(
                    {
                        include: [
                            {
                                model: ProdToTag,
                                as: 'product_tag'
                            },
                            {
                                model: prodToCate,
                                as: "product_category"
                            },
                            {
                                model: attachments,
                                as: "product_Images",
                                attributes: ["afile_id", "afile_type", ["afile_record_id", "product_id"], "afile_physical_path", "afile_name"],
                            }
                        ],
                        limit: prodLimit,
                        offset: offset,
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
                    }
                );
                if (products.length > 0) {
                    return res.status(200).json({ success: true, message: "success", count: products.length, Total_Count: totalCount, products })
                }
                else {
                    return res.status(200).json({ success: true, message: "No product found", count: products.length, products })
                }
            } catch (error) {
                console.log(error)
                return res.status(400).json({ success: false, message: "Somthing went wrong", error: error.message })
            }
        }
        else {
            if (product_name) {
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
                            },
                            {
                                model: attachments,
                                as: "product_Images",
                                attributes: ["afile_id", "afile_type", ["afile_record_id", "product_id"], "afile_physical_path", "afile_name"],
                            }
                        ],
                        where: {
                            [Op.and]: [
                                {
                                    product_name: {
                                        [Op.like]: `%${product_name}%`
                                    }
                                },
                                {
                                    product_delete: 0
                                }
                            ]
                        }
                    });
                    if (response.length > 0) {
                        return res.status(200).json({ success: true, message: "success", count: response.length, Total_Count: totalCount, response })
                    }
                    else {
                        return res.status(200).json({ success: false, message: "no result found", count: response.length, response })
                    }
                } catch (error) {
                    return res.status(400).json({ success: false, message: "something went wrong", error: error.message })
                }
            }
        }
    }
    else {
        let ProdPage = page || 1;
        let prodLimit = limit || 10;
        const offset = (ProdPage - 1) * prodLimit;
        try {
            const products = await Products.findAll(
                {
                    include: [
                        {
                            model: ProdToTag,
                            as: 'product_tag'
                        },
                        {
                            model: prodToCate,
                            as: "product_category"
                        }, {
                            model: attachments,
                            as: "product_Images",
                            attributes: ["afile_id", "afile_type", ["afile_record_id", "product_id"], "afile_physical_path", "afile_name"],
                        }
                    ],
                    limit: prodLimit,
                    offset: offset,
                    where: {
                        product_delete: 0
                    }
                }
            );
            if (products.length > 0) {
                return res.status(200).json({ success: true, message: "Success", count: products.length, Total_Count: totalCount, products })
            }
            else {
                return res.status(200).json({ success: false, message: "no product found", count: products.length, products })
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: "Somthing went wrong", error: error.message })
        }
    }
};

const deleteProduct = async (req, res) => {
    const id = req.body.product_id;
    // return
    if (id && id.length > 0) {
        try {
            const product = await Products.update(
                {
                    product_delete: 1
                },
                {
                    where: {
                        product_id: {
                            [Op.in]: id
                        }
                    }
                }
            );
            if (product.length > 0) {
                return res.status(200).json({ success: true, message: "deleted successfully", count: product.length, product })
            }
            else {
                return res.status(200).json({ success: false, message: "no record found", count: product.length, product })
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error: error.message })
        }
    }
    return res.status(400).json({ success: false, message: "id is required", })

};
const changeStatus = async (req, res) => {
    let id = req.body.product_id;
    let product_status = req.body.product_status;
    if (product_status === 1 || product_status === 0) {
        if (id && id.length > 0) {
            try {
                const changeStatus = await Products.update(
                    {
                        product_status: product_status
                    },
                    {
                        where: {
                            product_id: {
                                [Op.in]: id
                            }
                        }
                    }
                );
                if (changeStatus.length > 0) {
                    return res.status(200).json({ success: true, message: "successfully updated", changeStatus })
                }
                else {
                    return res.status(400).json({ success: false, message: "no chnages updated / something went wrong" })
                }
            } catch (error) {
                return res.status(400).json({ success: false, message: "Something went wrong", error: error.message })
            }
        }
        return res.status(400).json({ success: false, message: "id is required" });
    }
    return res.status(400).json({ success: false, message: "status is required" });
};




const search = async (req, res) => {
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
const Delete = async (req, res) => {
    const id = req.body.product_id
    console.log(id.length)
    if (id.length > 0) {
        try {
            const deleteProducts = await Products.update(
                {
                    product_delete: 1
                },
                {
                    where: {
                        product_id: {
                            [Op.in]: id
                        }
                    }
                }
            )
            if (deleteProducts.length > 0) {
                return res.status(200).json({ success: true, message: "deleted successfully", deleteProducts })
            }
        } catch (error) {
            console.log(error);
            return res.status(404).json({ success: false, message: "something went wrong", error: error.message })
        }
    }
    return res.status(404).json({ success: false, message: "no record found" })
}
const Status = async (req, res) => {
    const id = req.body.product_id;
    const product_status = req.body.product_status
    if (id.length > 0) {
        if (product_status === 1 || product_status === 0) {
            try {
                const changeStatus = await Products.update(
                    {
                        product_status: product_status
                    },
                    {
                        where: {
                            product_id: {
                                [Op.in]: id
                            }
                        }
                    }
                );
                if (changeStatus.length > 0) {
                    return res.status(200).json({ success: true, message: "status change successfully", changeStatus });
                }
                return res.status(400).json({ success: false, message: "No data update", changeStatus })
            } catch (error) {
                console.log(error);
                return res.status(400).json({ success: false, message: "Something went wrong", error: error.message });
            }
        }
    }
    return res.status(400).json({ success: false, message: "no record found/ id is required" });
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
};
module.exports =
{
    addProduct, Delete, Status,
    search, singleProduct, filterByName, filterProductByStatus, products, deleteProduct, changeStatus
}

