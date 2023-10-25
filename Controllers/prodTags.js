const db = require("../models");
const { sequelize, DataTypes } = require("sequelize");
const { Op } = require("sequelize");
const Tag = db.Tags;

const addTag = async (req, res) => {
    const { prodtag_name, prodtag_status, prodtag_id } = req.body;
    console.log(req.body)
    // return
    if (!prodtag_name || !prodtag_status) {
        return res.status(400).json({ success: false, message: "name & status is required" });
    }
    else {
        try {
            // insert tag
            if (!prodtag_id) {
                let dataToInsert = { prodtag_name: prodtag_name, prodtag_active: prodtag_status };
                console.log(dataToInsert,"dataToInsert");
                // return
                const addTag = await Tag.create(dataToInsert);
                return res.status(201).json({ success: true, message: "tag add successfully", addTag })
            }
            if (prodtag_id) {
                let dataToUpdate = { prodtag_name: prodtag_name, prodtag_active: prodtag_status, prodtag_id: prodtag_id };
                const updateTag = await Tag.update(dataToUpdate, {
                    where: {
                        prodtag_id: prodtag_id
                    },
                });
                if (updateTag[0] === 1) {
                    return res.status(200).json({ success: true, message: "tag updated successfully", updateTag });
                }
                else {
                    return res.status(400).json({ success: false, message: "record not found" });
                }
            };
        } catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: "something went wrong", error });
        }
    }
};
const getAllTags = async (req, res) => {
    try {
        const allTags = await Tag.findAll({
            attributes: [
                ["prodtag_id", "prodtag_id"],
                ["prodtag_name", "prodtag_name"],
                ["prodtag_active", "prodtag_status"],
                ["prodctag_added_at", "RegDate"],
            ], where: {
                prodtag_delete: 0
            },
            order: [
                ['prodtag_id', 'DESC'] // Order by 'RegDate' in descending order
            ]
        });
        return res.status(200).json({ success: true, message: "successfull", allTags });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "something went wrong", error });
    };
};
const getSingleTag = async (req, res) => {
    const id = req.params.id;
    try {
        const singleTag = await Tag.findAll({
            attributes: [
                ["prodtag_id", "prodtag_id"],
                ["prodtag_name", "prodtag_name"],
                ["prodtag_active", "prodtag_status"],
            ],
            where: {
                prodtag_id: id,
            },
        }, id);
        return res.status(200).json({ success: true, message: "successfull", singleTag });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: "Something went wrong", error });
    }
};
const changeStatus = async (req, res) => {
    const id = req.params.id;
    const prodtag_status = req.body.prodtag_status;
    // console.log(prodtag_status)
    // return
    if (prodtag_status || prodtag_status === 0) {
        try {
            const updateStatus = await Tag.update(
                { prodtag_active: prodtag_status },
                {
                    where: {
                        prodtag_id: id,
                    },
                });
            return res.status(200).json({ success: true, message: "updated Successfully", updateStatus });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ success: false, message: "something wnent wrong", error });
        };
    }
    else {
        return res.status(404).json({ success: false, message: "status  tus is required" });
    }
};
const deleteSingleTag = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const deleteTag = await Tag.update(
                {
                    prodtag_delete: 1,
                }, {
                where: {
                    prodtag_id: id
                }
            });
            return res.status(200).json({ success: true, message: "Tag deleted successfully" })
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error })
        }
    }
    return res.status(404).json({ success: false, message: "no record found or id is required" })
};
const changeStatusMultiple = async (req, res) => {
    const prodtag_id = req.body.prodtag_id;
    const prodtag_status = req.body.prodtag_status;
    console.log(prodtag_status, prodtag_id.length)
    // return
    if (prodtag_id.length > 0) {
        if (prodtag_status === 1 || prodtag_status === 0) {
            try {
                const updateTag = await Tag.update({
                    prodtag_active: prodtag_status
                },
                    {
                        where: {
                            prodtag_id: prodtag_id
                        },
                    },
                );
                return res.status(200).json({ success: true, message: "update successfully", updateTag });
            } catch (error) {
                return res.status(400).json({ success: false, message: "something went wrong", error });
            }
        } else {
            return res.status(404).json({ success: false, message: "id or status is required " });
        };
    } else {
        return res.status(400).json({ success: false, message: "id or status is required " });
    }

};
const deleteMultipleTags = async (req, res) => {
    const id = req.body.prodtag_id;
    console.log(id)
    // return
    if (id.length > 0 && id) {
        try {
            const deleteMultiple = await Tag.update({
                prodtag_delete: 1
            }, {
                where: {
                    prodtag_id: id
                },
            });
            return res.status(200).json({ success: true, message: "deleted successfully", deleteMultiple })
        } catch (error) {
            return res.status(400).json({ success: false, message: "something went wrong", error })
        }
    }
    else {
        return res.status(404).json({ success: false, message: "no record found or id is required" })
    };
};
const filterTagByName = async (req, res) => {
    const inputname = req.query.prodtag_name;
    if (inputname) {
        const findName = inputname.split(' ');
        console.log(findName);
        try {
            const matchingNames = await Tag.findAll({
                where: {
                    prodtag_name: {
                        [Op.or]: findName.map((name) => (
                            {

                                [Op.like]: `%${name}%`,
                            }
                        ))
                    }
                }
            });
            return res.status(200).json({ success: true, message: "SuccessFull", matchingNames });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ success: false, message: "something went wrong", error })
        };
    }
    else {
        return res.status(400).json({ success: false, message: "name is required" })
    }
    // Split the input name into words


};
const filterCategoryByName = async (req, res) => {
    const inputName = req.query.prodCatName;
    console.log(inputName);
    if (inputName) {
        try {
            const findName = inputName.split(' ');
            console.log(findName);
            const matchingNames = await ProdCate.findAll({
                attributes: [
                    ["prodcat_id", "prodcatId"],
                    ["prodcat_name", "prodCatName"],
                    ["prodcat_active", "prodCatStatus"],
                    ["prodcat_added_at", "RegDate"]
                ],
                where: {
                    prodcat_name: {
                        [Op.or]: findName.map((name) => (
                            {
                                [Op.like]: `%${name}%`,
                            }
                        ))
                    },
                    prodcat_deleted: 0
                }
            });
            return res.status(200).json({ success: true, message: "SuccessFull", matchingNames })
        } catch (error) {
            return res.status(400).json({ success: false, message: "Something Went wrong", error })
        }
    }
    else {
        return res.status(400).json({ success: false, message: "name is required" })
    }

};
const filterCategoryByStatus = async (req, res) => {
    const prodCatStatus = req.body.prodCatStatus;
    if (prodCatStatus || prodCatStatus === 0) {
        try {
            const findCate = await ProdCate.findAll({
                attributes: [
                    ["prodcat_id", "prodcatId"],
                    ["prodcat_name", "prodCatName"],
                    ["prodcat_active", "prodCatStatus"],
                    ["prodcat_added_at", "RegDate"]
                ],
                where: {
                    [Op.and]: [
                        {
                            prodcat_active: prodCatStatus
                        },
                        {
                            prodcat_deleted: 0
                        }
                    ]
                }
            });
            return res.status(200).json({ success: true, message: "successfull", findCate })
        } catch (error) {
            return res.status(400).json({ success: false, message: "Something went wrong", error })
        }
    } else {
        return res.status(400).json({ success: false, message: "No record found" })
    }
};
const filterTagByStatus = async (req, res) => {
    const prodtag_status = req.body.prodtag_status;
    if (prodtag_status || prodtag_status === 0) {
        const findTag = await Tag.findAll({
            attributes: [
                ["prodtag_id", "prodtag_id"],
                ["prodtag_name", "prodtag_name"],
                ["prodtag_active", "prodtag_status"],
                ["prodctag_added_at", "RegDate"],
            ],
            where: {
                [Op.and]: [
                    {
                        prodtag_active: prodtag_status
                    },
                    {
                        prodtag_delete: 0
                    }]
            }
        });
        res.send(findTag);
    }
    else {
        console.log("err")
    }
}

module.exports = {filterTagByStatus,filterCategoryByName,filterCategoryByStatus, addTag, getAllTags, getSingleTag, changeStatus, deleteSingleTag, changeStatusMultiple, deleteMultipleTags, filterTagByName };