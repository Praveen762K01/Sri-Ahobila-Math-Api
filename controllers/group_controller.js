const { Op } = require("sequelize");
const model = require('../models');

createGroup = async (req, res) => {
    try {
        const data = {
            group_name: req.body.group_name,
            created_by: req.body.created_by,
            is_active: true
        }

        await model.GroupMaster.create(data).then(async (result) => {
            return res.status(200).json({ message: "Group Created Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to create price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getActiveGroup = async (req, res) => {
    try {
           await model.GroupMaster.findAll({where:{is_active:true}}).then(async(result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get group.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllGroupName = async (req, res) => {
    try {
           await model.GroupMaster.findAll().then(async(result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

activateDeactivateGroup = async (req, res) => {
    const data={
       id:req.body.id,
       is_active:req.body.is_active
    };
    try {
        model.GroupMaster.update({is_active:data["is_active"]}, {
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

memberGroupMapping = async (req, res) => {
    const newGroupId = req.body.group_id;
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
            const currentGroupIds = user.group_id ? user.group_id.split(",") : [];
            if (!currentGroupIds.includes(newGroupId)) {
                currentGroupIds.push(newGroupId);
            }
            return user.update({ group_id: currentGroupIds.join(",") });
        });

        // Execute the updates
        await Promise.all(updatePromises);

        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};

groupMemberRemove = async (req, res) => {
    const groupIdToRemove = req.body.group_id;
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
            if (user.group_id) {
                const currentGroupIds = user.group_id.split(",");
                // Remove the groupIdToRemove from the array
                const updatedGroupIds = currentGroupIds.filter(id => id !== groupIdToRemove);
                // Update the user record with the new group_id
                return user.update({ group_id: updatedGroupIds.join(",") });
            }
            return Promise.resolve(); // No update needed if group_id is null
        });

        // Execute the updates
        await Promise.all(updatePromises);

        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};


groupNonMembers = async (req, res) => {
    const data = {
        group_id: req.body.group_id
    };

    try {
        const result = await model.UserData.findAll({
            where: {
                is_registered: true,
                user_approved: true,
                is_active: true,
                group_id: {
                    [Op.or]: [
                        { [Op.eq]: null },
                        { [Op.notLike]: `%${data.group_id}%` }
                    ]
                }
            }
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};

groupMembers = async (req, res) => {
    const data = {
        group_id: req.body.group_id
    };

    if (!data.group_id) {
        return res.status(400).json({ message: "group_id is required" });
    }

    try {
        const result = await model.UserData.findAll({
            where: {
                is_registered: true,
                user_approved: true,
                is_active: true,
                group_id: {
                    [Op.or]: [
                        { [Op.like]: `%,${data.group_id},%` },
                        { [Op.like]: `${data.group_id},%` },
                        { [Op.like]: `%,${data.group_id}` },
                        { [Op.like]: data.group_id }
                    ]
                }
            }
        });

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something Went Wrong" });
    }
};

module.exports = {
    createGroup: createGroup,
    getActiveGroup:getActiveGroup,
    getAllGroupName:getAllGroupName,
    activateDeactivateGroup:activateDeactivateGroup,
    memberGroupMapping:memberGroupMapping,
    groupNonMembers:groupNonMembers,
    groupMembers:groupMembers,
    groupMemberRemove:groupMemberRemove
}