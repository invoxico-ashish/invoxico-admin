const db = require("../models");
const { Op } = require("sequelize");
const slugify = require("slugify")
const Brand = db.Brand;
const Attchament = db.AttachRec
const mod_key = process.env.ATTACHMENT_RECORD_MODULE_ID_BRANDS;


const addBrand = async (req, res) => {
    const { brand_name, brand_featured, brand_status, brand_id } = req.body
    let slug = slugify(brand_name, {
        strict: false,
        lower: true,
    });
    if (brand_name) {
        try {
            if (brand_id) {
                const dataToUpdate = {
                    brand_name: brand_name,
                    brand_slug: slug,
                    brand_featured: brand_featured,
                    brand_status: brand_status,
                    brand_id: brand_id,
                }
                const updatebrand = await Brand.update(dataToUpdate, {
                    where: {
                        brand_id: brand_id
                    }
                });
                if (updatebrand[0] === 1) {
                    const file = req.file;
                    if (file) {
                        const imgToUpdate = { afile_physical_path: file.filename, afile_name: file.originalname }
                        const updateImg = await Attchament.update(imgToUpdate, {
                            where: {
                                afile_record_id: brand_id
                            }
                        });
                        return res.status(200).json({ success: true, message: "Updated successfully", updatebrand, updateImg });
                    }
                }
                else {
                    return res.status(400).json({ success: false, message: "no record found", updatebrand });
                }
            } else {
                const dataToInsert = {
                    brand_name: brand_name,
                    brand_slug: slug,
                    brand_featured: brand_featured,
                    brand_status: brand_status,
                }
                const insertbrand = await Brand.create(dataToInsert);
                const file = req.file;
                const attachmentData = {
                    afile_type: mod_key,
                    afile_record_id: insertbrand.brand_id,
                    afile_physical_path: file.filename,
                    afile_name: file.originalname
                }
                const attachRecord = await Attchament.create(attachmentData)
                return res.status(201).json({ success: true, message: "Creted Successfully", insertbrand })
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, message: "something went wrong", error: error.message })
        }
    }
    else {
        return res.status(400).json({ success: false, message: "brand name is required" })
    }
};
const brands = async (req, res) => {
    try {
        const brand = await Brand.findAll({
            include: [{
                model: Attchament,
                attributes: ["afile_id", "afile_type", ["afile_record_id", "brand_id"], "afile_physical_path", "afile_name"],
                as: 'otherInfo'
            }],
            attributes: ["brand_id", "brand_name", "brand_featured", "brand_status", "brand_added_at"],
            where: { brand_deleted: 0 }
        });
        return res.status(200).json({ success: true, message: "Successfull", brand })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Something went wrong", error: error.message })
    }
};
const brandById = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const brand = await Brand.findByPk(id, {
                include: [{
                    model: Attchament,
                    attributes: ["afile_id", "afile_type", ["afile_record_id", "brand_id"], "afile_physical_path", "afile_name"],
                    as: "otherInfo",
                    where: {
                        [Op.and]: [
                            {
                                afile_record_id: id
                            },
                            {
                                afile_type: mod_key
                            }
                        ]
                    }
                }],
                attributes: ["brand_id", "brand_name", "brand_featured", "brand_status"]
            },

            );
            return res.status(200).json({ success: true, message: "Successfull", brand })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, message: "Something went wrong", error: error.message });
        }

    } else {
        return res.status(404).json({ success: false, message: "no record found/id is required" });
    }
};
const deleteBrand = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const deleteBrand = await Brand.update({
                brand_deleted: 1
            },
                {
                    where: {
                        brand_id: id
                    }
                });
            if (deleteBrand.length > 0) {
                return res.status(200).json({ success: true, message: "deleted successfully", deleteBrand })
            }
            else {
                return res.status(400).json({ success: false, message: "no action performed / no record found" })
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error: error.message })
        }
    } else {
        return res.status(404).json({ success: false, message: "no record found/id is required" })
    }
};
const changeBrandStatus = async (req, res) => {
    const id = req.params.id
    const brand_status = req.body.brand_status
    if (brand_status || brand_status === 0) {
        try {
            const status = await Brand.update({ brand_status }, {
                where: {
                    brand_id: id
                }
            });
            if (status.length > 0) {
                return res.status(200).json({ success: true, message: "updated successdfully", status })
            } else {
                return res.status(400).json({ success: false, message: "no action performed" })
            }
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: "something went wrong", error: error.message })
        }
    }
    else {
        return res.status(400).json({ success: false, message: "status is required" })
    }


};
const changeBrandStatusMultiple = async (req, res) => {
    const ids = req.body.brand_id;
    const status = req.body.brand_status;
    if (ids.length > 0) {
        if (status || status === 0) {
            try {
                const changeStatus = await Brand.update({
                    brand_status: status
                },
                    {
                        where: {
                            brand_id: ids
                        }
                    });
                if (changeStatus.length > 0) {
                    return res.status(200).json({ success: true, message: "successfull updated", changeStatus })
                } else {
                    return res.status(400).json({ success: false, message: "no action performed" })
                }
            } catch (error) {
                return res.status(400).json({ success: false, message: "something went wrong", error: error.message })
            }
        } else {
            return res.status(400).json({ success: false, message: "status is required" })
        }
    } else {
        return res.status(404).json({ success: false, message: "id is required" })
    }
};
const delteMultipleBrands = async (req, res) => {
    const ids = req.body.brand_id;
    if (ids && ids.length > 0) {
        try {
            const deleteMulti = await Brand.update({
                brand_deleted: 1
            },
                {
                    where: {
                        brand_id: ids
                    }
                })
            if (deleteMulti.length > 0) {
                return res.status(200).json({ success: true, message: "deleted successfully", deleteMulti })
            } else {
                return res.status(404).json({ success: false, message: "no record found or update" })
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error: error.message })
        }
    } else {
        return res.status(404).json({ success: false, message: "id is required" })
    }
};
const filterBrandByName = async (req, res) => {
    const inputName = req.body.brand_name;
    if (inputName) {
        const findName = inputName.split(' ');
        console.log(findName)
        // return
        try {
            const response = await Brand.findAll({
                include: [{
                    model: Attchament,
                    attributes: ["afile_id", "afile_type", ["afile_record_id", "brand_id"], "afile_physical_path", "afile_name"],
                    as: 'otherInfo'
                }],
                where: {
                    [Op.and]: [
                        {
                            brand_name: {
                                [Op.like]: `%${inputName}%`
                            }
                        },
                        {
                            brand_deleted: 0
                        }
                    ]
                }, attributes: ["brand_id", "brand_name", "brand_featured", "brand_status", "brand_deleted", "brand_added_at"]
            })
            if (response && response.length > 0) {
                return res.status(200).json({ success: true, message: "successfull", response })
            } else {
                return res.status(400).json({ success: false, message: "No record found" })
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: "Something went wrong", error: error.message })
        }
    } else {
        return res.status(400).json({ success: false, message: "brand_name is required" })
    }
}
const filterBrandByStatus = async (req, res) => {
    const inputStatus = req.body.brand_status;
    if (inputStatus || inputStatus === 0) {
        try {
            const findBrand = await Brand.findAll({
                include: [{
                    model: Attchament,
                    attributes: ["afile_id", "afile_type", ["afile_record_id", "brand_id"], "afile_physical_path", "afile_name"],
                    as: 'otherInfo'
                }],
                attributes: ["brand_id", "brand_name", "brand_featured", "brand_status", "brand_added_at"],
                where: {
                    [Op.and]: [
                        {
                            brand_status: inputStatus
                        },
                        {
                            brand_deleted: 0
                        },
                    ],
                },
            },);
            return res.status(200).json({ success: true, message: "successfull", findBrand })
        } catch (error) {
            return res.status(400).json({ success: false, message: "Something went wrong", error: error.message })
        }
    } else {
        return res.status(400).json({ success: false, message: "status is required" })
    }
}
module.exports =
{
    addBrand, deleteBrand, brands, brandById, changeBrandStatus, changeBrandStatusMultiple,
    delteMultipleBrands, filterBrandByName, filterBrandByStatus,
};