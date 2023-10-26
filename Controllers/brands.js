const db = require("../models");
const Brand = db.Brand;
const Attchament = db.AttachRec
const mod_key = process.env.ATTACHMENT_RECORD_MODULE_ID_BRANDS;


const addBrand = async (req, res) => {
    const { brand_name, brand_slug, brand_featured, brand_status, brand_id } = req.body
    const file = req.file;
    if (brand_name && brand_slug) {
        try {
            if (brand_id) {
                const dataToUpdate = {
                    brand_name: brand_name,
                    brand_slug: brand_slug,
                    brand_featured: brand_featured,
                    brand_status: brand_status,
                    brand_id: brand_id,
                }
                console.log(dataToUpdate, "dataToUpdate")
                const updatebrand = await Brand.update(dataToUpdate, {
                    where: {
                        brand_id: brand_id
                    }
                });
                if (updatebrand[0] === 1) {
                    return res.status(200).json({ success: true, message: "Updated successfully", updatebrand });
                }
                else {
                    return res.status(400).json({ success: false, message: "no record found", updatebrand });
                }
            } else {
                const dataToInsert = {
                    brand_name: brand_name,
                    brand_slug: brand_slug,
                    brand_featured: brand_featured,
                    brand_status: brand_status,
                }
                const insertbrand = await Brand.create(dataToInsert);
                const attachmentData = {
                    afile_type: mod_key,
                    afile_record_id: insertbrand.brand_id,
                    afile_physical_path: file.filename,
                    afile_name: file.originalname
                }
                const attachRecord = await Attchament.create(attachmentData)
                return res.status(201).json({ success: true, message: "Creted Successfully", insertbrand, attachRecord })
            }
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error })
        }
    }
    else {
        return res.status(400).json({ success: false, message: "brand name is required" })
    }
};
const brands = async (req, res) => {
    try {
        const brand = await Brand.findAll({
            attributes: ["brand_name", "brand_featured", "brand_status"]
        },
            {
                where: {
                    brand_deleted: 0
                }
            });
        return res.status(200).json({ success: true, message: "Successfull", brand })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Something went wrong", error })
    }
};
const brandById = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const brand = await Brand.findByPk(id,
                { attributes: ["brand_id", "brand_name", "brand_featured", "brand_status"] },
                {
                    where: {
                        brand_deleted: 0
                    },
                });
            return res.status(200).json({ success: true, message: "Successfull", brand })
        } catch (error) {
            return res.status(400).json({ success: false, message: "Something went wrong", error });
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
            return res.status(400).json({ success: false, message: "something went wrong", error })
        }
    } else {
        return res.status(404).json({ success: false, message: "no record found/id is required" })
    }
};
module.exports =
{
    addBrand, deleteBrand, brands, brandById
};