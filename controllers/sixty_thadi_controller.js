const { Op } = require('sequelize');
const model = require('../models');

createDate = async (req, res) => {
    try {
        const currentDate = new Date();
        const requestDataFromDate = new Date(req.body.from_date);
        const requestDataToDate = new Date(req.body.to_date);

        // Validate if from_date is today or in the future
        if (requestDataFromDate < currentDate) {
            return res.status(500).json({ message: "From date must be today or in the future." });
        }

        // Validate if to_date is greater than from_date
        if (requestDataToDate <= requestDataFromDate) {
            return res.status(500).json({ message: "To date must be greater than from date." });
        }

        // Calculate difference in days
        const differenceInDays = Math.round((requestDataToDate - requestDataFromDate) / (1000 * 60 * 60 * 24));

        // Validate if difference is at least 60 days
        if (differenceInDays < 60) {
            return res.status(500).json({ message: "Difference between from date and to date must be at least 60 days." });
        }

        const data = {
            from_date: req.body.from_date,
            to_date: req.body.to_date,
            month_name: req.body.month_name,
            price: req.body.price,
            is_active: true
        };

        // Update existing active record to is_active: false
        await model.SixtyThadi_Master_Table.update(
            { is_active: false },
            { where: { is_active: true } }
        );

        // Create new record with the provided data
        await model.SixtyThadi_Master_Table.create(data)
            .then((result) => {
                return res.status(200).json({ message: "Price Created Successfully." });
            })
            .catch((err) => {
                return res.status(500).json({ message: "Not able to create price.", error: err });
            });

    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
};

getDate= async (req, res) => {
    const dateFormat = new Date();
    const formattedCurrentDate = dateFormat.toISOString().split('T')[0];

    try {
        await model.SixtyThadi_Master_Table.findOne({where:{
            is_active:true, from_date: {
                [Op.gte]: formattedCurrentDate
            }
        }}).then((result) => {
            if (result!=null) {
                return res.status(200).json(result);
            } else {
                return res.status(500).json({ message: "No price found for Thadiyarathanai. So not able to book now." });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllDate= async (req, res) => {
    try {
        await model.SixtyThadi_Master_Table.findAll({order: [
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
        await model.SixtyThadi_Master_Table.findOne({ where: { id: data["id"] } }).then((result) => {
            if (result) {
                model.SixtyThadi_Master_Table.destroy({ where: { id: data["id"] } }).then((x) => {
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
        await model.SixtyThadi_Transaction_Table.findAll().then((result) => {
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
        await model.SixtyThadi_Transaction_Table.create(data).then((result) => {
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
       await model.SixtyThadi_Transaction_Table.update(data,{where:{id:data["id"]}}).then((result) => {
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
       await model.SixtyThadi_Transaction_Table.update(data,{where:{id:data["id"]}}).then((result) => {
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
        await model.SixtyThadi_Transaction_Table.findAll({ where: { user_id: data["user_id"] } }).then((result) => {
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
        await model.SixtyThadi_Transaction_Table.findAll({ where: {id: data["id"] } }).then((result) => {
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