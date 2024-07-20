const model = require('../models');

createMessage = async (req, res) => {
    try {
        const data = {
           message:req.body.message,
           created_by:req.body.created_by,
            is_active: true
        }
       
        await model.FlashMessageMaster.create(data).then(async(result) => {
            return res.status(200).json({ message: "Message Created Successfully."});
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to create price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getActiveMessage = async (req, res) => {
    try {
           await model.FlashMessageMaster.findAll({where:{is_active:true}}).then(async(result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllMessage = async (req, res) => {
    try {
           await model.FlashMessageMaster.findAll().then(async(result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

activateDeactivateMessage = async (req, res) => {
    const data={
       id:req.body.id,
       is_active:req.body.is_active
    };
    try {
        model.FlashMessageMaster.update({is_active:data["is_active"]}, {
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

module.exports = {
    createMessage: createMessage,
    getActiveMessage:getActiveMessage,
    getAllMessage:getAllMessage,
    activateDeactivateMessage:activateDeactivateMessage
}