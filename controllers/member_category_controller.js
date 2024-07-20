const { Op } = require("sequelize");
const model = require('../models');

createCategory = async (req, res) => {
    try {
        const data = {
            category_name: req.body.category_name,
            created_by: req.body.created_by,
            is_active: true
        }

        await model.CategoryMaster.create(data).then(async (result) => {
            return res.status(200).json({ message: "Category Created Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to create price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllCategoryName = async (req, res) => {
    try {
           await model.CategoryMaster.findAll().then(async(result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

activateDeactivateCategory = async (req, res) => {
    const data={
       id:req.body.id,
       is_active:req.body.is_active
    };
    try {
        model.CategoryMaster.update({is_active:data["is_active"]}, {
            where: {
              id:data["id"]  
            }
        }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "No Data Found" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
    }
}

memberCategoryMapping = async (req, res) => {
    const user_status = req.body.user_status;
    const user_status_id = req.body.user_status_id;
    const userIds = req.body.user_id.split(",").map(Number);

    try {
        // Fetch the current group_id for each user
        const users = await model.UserData.findAll({
            where: {
                id: {
                    [Op.in]: userIds
                }
            }
        });

        // Prepare the update promises
        const updatePromises = users.map(user => {
            // Replace old group_id with the new category_id
            return user.update({ user_status_id: user_status_id,user_status:user_status });
        });

        // Execute the updates
        await Promise.all(updatePromises);

        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};

removeCategoryFromUsers = async (req, res) => {
    const userIds = req.body.user_id.split(",").map(Number);

    try {
        // Fetch the current group_id for each user
        const users = await model.UserData.findAll({
            where: {
                id: {
                    [Op.in]: userIds
                }
            }
        });

        // Prepare the update promises
        const updatePromises = users.map(user => {
            // Remove category by setting user_status_id and user_status to null
            return user.update({ user_status_id: null, user_status: null });
        });

        // Execute the updates
        await Promise.all(updatePromises);

        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};

categoryNonMembers = async (req, res) => {
    const data = {
        user_status_id: req.body.user_status_id
    };

    try {
        const result = await model.UserData.findAll({
            where: {
                is_registered: true,
                user_approved: true,
                is_active: true,
                user_status_id: {
                    [Op.or]: [
                        { [Op.eq]: null },
                        { [Op.ne]: data.user_status_id }
                    ]
                }
            }
        });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};

categoryMembers = async (req, res) => {
    const data = {
        user_status_id: req.body.user_status_id
    };

    try {
        const result = await model.UserData.findAll({
            where: {
                is_registered: true,
                user_approved: true,
                is_active: true,
                user_status_id: {
                    [Op.eq]: data.user_status_id
                }
            }
        });

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};


module.exports = {
    createCategory:createCategory,
    getAllCategoryName:getAllCategoryName,
    activateDeactivateCategory:activateDeactivateCategory,
    categoryNonMembers:categoryNonMembers,
    memberCategoryMapping:memberCategoryMapping,
    categoryMembers:categoryMembers,
    removeCategoryFromUsers:removeCategoryFromUsers
}