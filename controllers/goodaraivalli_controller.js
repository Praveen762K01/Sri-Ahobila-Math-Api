const model = require('../models');

createDate = async (req, res) => {
    try {
        const data = {
            date: req.body.date,
            price: req.body.price,
            is_active: true
        }
        await model.Goodaraivalli_Master_Table.update({ is_active: false }, { where: {
            is_active:true
        }}).then(async(result) => {
            await model.Goodaraivalli_Master_Table.create(data).then((result) => {
            return res.status(200).json({ message: "Price Created Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to create price.", error: err });
        }); 
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to create price.", error: err });
        });
       
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getDate = async (req, res) => {
    try {
        await model.Goodaraivalli_Master_Table.findOne({ where: { is_active: true } }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllPrice = async (req, res) => {
    try {
        await model.Goodaraivalli_Master_Table.findAll().then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

deleteDate = async (req, res) => {
    try {
        const data = {
            id: req.body.id
        }
        await model.Goodaraivalli_Master_Table.findOne({ where: { id: data["id"] } }).then((result) => {
            if (result) {
                model.Goodaraivalli_Master_Table.destroy({ where: { id: data["id"] } }).then((x) => {
                    return res.status(200).json({ message: "Date Deleted Successfully" });
                }).catch((err) => {
                    return res.status(500).json({ message: "Not able to delete price.", error: err });
                });
            } else {
                return res.status(500).json({ message: "Data Not found" });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to delete price.", error: err });
        });

    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

allBookings=async(req,res)=>{
    try {
        await model.Goodaraivalli_Transaction_Table.findAll().then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get data.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

newBooking = async (req, res) => {
    try {
        const data = {
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            mail_id: req.body.mail_id,
            mobile_number: req.body.mobile_number,
            address: req.body.address,
            date: req.body.date,
            price: req.body.price,
            booking_count: req.body.booking_count,
            total_value: req.body.total_value,
            message: req.body.message,
            is_approved: "Booked",
            is_paid:false,
            approved_by:""
        }
        await model.Goodaraivalli_Transaction_Table.create(data).then((result) => {
            return res.status(200).json({ message: "Goodaraivalli Booked Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to book.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

updateStatus =async(req,res)=>{
    try {
       const data={
           approved_by:req.body.approved_by,
           is_approved:req.body.is_approved,
           id:req.body.id
       }
       await model.Goodaraivalli_Transaction_Table.update(data,{where:{id:data["id"]}}).then((result) => {
           return res.status(200).json({message:"Data updated Successfully"});
       }).catch((err) => {
           return res.status(500).json({ message: "Not able update booking.", error: err });
       });
    } catch (error) {
       return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

updatePaymentStatus =async(req,res)=>{
    try {
       const data={
           id:req.body.id,
           is_paid:true
       }
       await model.Goodaraivalli_Transaction_Table.update(data,{where:{id:data["id"]}}).then((result) => {
           return res.status(200).json({message:"Data updated Successfully"});
       }).catch((err) => {
           return res.status(500).json({ message: "Not able update booking.", error: err });
       });
    } catch (error) {
       return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

myBookings = async (req, res) => {
    try {
        const data = {
            user_id: req.body.user_id
        }
        await model.Goodaraivalli_Transaction_Table.findAll({ where: { user_id: data["user_id"] } }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get data.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getBookingDetail = async (req, res) => {
    try {
        const data = {
            id: req.body.id
        }
        await model.Goodaraivalli_Transaction_Table.findAll({ where: {id: data["id"] } }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get data.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

module.exports = {
    createDate: createDate,
    getDate: getDate,
    getAllPrice:getAllPrice,
    deleteDate: deleteDate,
    newBooking: newBooking,
    myBookings: myBookings,
    allBookings:allBookings,
    updateStatus:updateStatus,
    getBookingDetail:getBookingDetail,
    updatePaymentStatus:updatePaymentStatus
}