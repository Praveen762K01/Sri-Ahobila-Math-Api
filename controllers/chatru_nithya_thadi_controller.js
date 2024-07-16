const { Op } = require('sequelize');
const model = require('../models');

createDate = async (req, res) => {
    try {
        const data = {
            from_date: req.body.from_date,
            to_date: req.body.to_date,
            month_name: req.body.month_name,
            price: req.body.price,
            is_active: true
        }
       
        const _date = new Date();
        const year = _date.getFullYear();
        const month =  (_date.getMonth() + 1)<10?('0'+ (_date.getMonth() + 1)): _date.getMonth() + 1;
        const date = _date.getDate();
        const currentDate = year + "-" + month+ "-" + date;

        // Validate if from_date is today or in the future
        if (data["from_date"] < currentDate) {
            return res.status(500).json({ message: "From date must be today or in the future." });
        }

        // Validate if to_date is greater than from_date
        if (data["to_date"] <= data["from_date"]) {
            return res.status(500).json({ message: "To date must be greater than from date." });
        }
        
        await model.Chatru_NithyaThadi_Master_Table.update({ is_active: false }, { where: {
            is_active:true
        }}).then(async(result) => {
            await model.Chatru_NithyaThadi_Master_Table.create(data).then((result) => {
            return res.status(200).json({ message: "Thadiyarathanai Date Created Successfully." });
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
    const dateFormat = new Date();
    const formattedCurrentDate = dateFormat.toISOString().split('T')[0];
    try {
        await model.Chatru_NithyaThadi_Master_Table.findOne({where:{
            is_active:true, from_date: {
                [Op.gte]: formattedCurrentDate
            }
        }, order: [
                ['from_date', 'ASC']
            ]}).then((result) => {
            if (result!=null) {
                return res.status(200).json(result);
            } else {
                return res.status(500).json({ message: "No price found for Thadiyarathanai. Please contact admin." });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllDate = async (req, res) => {
    try {
        await model.Chatru_NithyaThadi_Master_Table.findAll({order: [
            ['from_date', 'ASC']
        ]}).then((result) => {
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
        await model.Chatru_NithyaThadi_Master_Table.findOne({ where: { id: data["id"] } }).then((result) => {
            if (result) {
                model.Chatru_NithyaThadi_Master_Table.destroy({ where: { id: data["id"] } }).then((x) => {
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
        await model.Chatru_NithyaThadi_Transaction_Table.findAll({where:{is_approved:"Booked",is_paid:false}}).then((result) => {
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
            booking_count: "",
            total_value: req.body.total_value,
            message: req.body.message,
            price_id:req.body.price_id,
            payment_id:req.body.payment_id,
            is_approved: "Booked",
            is_paid:false,
            approved_by:""
        }
        await model.Chatru_NithyaThadi_Transaction_Table.create(data).then((result) => {
            return res.status(200).json({ message: "Thadiyarathanai Booked Successfully." });
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
       await model.Chatru_NithyaThadi_Transaction_Table.update(data,{where:{id:data["id"]}}).then((result) => {
           return res.status(200).json({message:"Data updated Successfully"});
       }).catch((err) => {
           return res.status(500).json({ message: "Not able update booking.", error: err });
       });
    } catch (error) {
       return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

updatePaymentStatus=async(req,res)=>{
    try {
       const data={
           id:req.body.id,
           is_paid:true
       }
       await model.Chatru_NithyaThadi_Transaction_Table.update(data,{where:{id:data["id"]}}).then((result) => {
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
        await model.Chatru_NithyaThadi_Transaction_Table.findAll({ where: { user_id: data["user_id"] } }).then((result) => {
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
        await model.Chatru_NithyaThadi_Transaction_Table.findAll({ where: {id: data["id"] } }).then((result) => {
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
    deleteDate: deleteDate,
    newBooking: newBooking,
    myBookings: myBookings,
    allBookings:allBookings,
    updateStatus:updateStatus,
    getBookingDetail:getBookingDetail,
    updatePaymentStatus:updatePaymentStatus,
    getAllDate:getAllDate
}