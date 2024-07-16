const { where } = require('sequelize');
const model = require('../models');

// Admin Portal Api
createPrice = async (req, res) => {
    try {
        const data = {
            price: req.body.price,
            is_active: true
        }
        await model.NithyaThadiyarathanaiPrice.update({ is_active: false }, { where: {
            is_active:true
        }}).then(async(result) => {
            await model.NithyaThadiyarathanaiPrice.create(data).then((result) => {
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

getPrice = async (req, res) => {
    try {
        await model.NithyaThadiyarathanaiPrice.findOne({where:{
            is_active:true
        }}).then((result) => {
            if(result!=null){
                return res.status(200).json(result);
            }else{
                return res.status(500).json({message:"No price found for Nithya Thadiyarathanai. Please contact admin."});
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllPrice = async (req, res) => {
    try {
        await model.NithyaThadiyarathanaiPrice.findAll().then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

deletePrice = async (req, res) => {
    try {
        const data = {
            id: req.body.id
        }
        await model.NithyaThadiyarathanaiPrice.findOne({ where: { id: data["id"] } }).then((result) => {
            if (result) {
                model.NithyaThadiyarathanaiPrice.destroy({ where: { id: data["id"] } }).then((x) => {
                    return res.status(200).json({ message: "Price Deleted Successfully" });
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

bookings=async(req,res)=>{
    try {
       const data={
        user_id:req.body.user_id
       } 
       await model.NithyaThadiyarathanaiBookings.findAll().then((result) => {
        return res.status(200).json(result);
       }).catch((err) => {
        return res.status(200).json({ message: "Not able to get data.", error: err });
       });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}
// Admin Portal Api

// User Website Api
newBooking = async (req, res) => {
    try {
        const data = {
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            mail_id: req.body.mail_id,
            mobile_number: req.body.mobile_number,
            address: req.body.address,
            from_date: req.body.from_date,
            to_date: req.body.to_date,
            price: req.body.price,
            booking_count: req.body.booking_count,
            total_value: req.body.total_value,
            message: req.body.message,
            price_id:req.body.price_id,
            payment_id:req.body.payment_id,
            is_approved: "Booked",
            is_paid:false,
            approved_by:""
        }
       
        await model.NithyaThadiyarathanaiBookings.create(data).then((result) => {
            return res.status(200).json({ message: "Nithya Thadiyarathanai Booked Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to book.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}
myBookings=async(req,res)=>{
    try {
       const data={
        user_id:req.body.user_id
       } 
       await model.NithyaThadiyarathanaiBookings.findAll({where:{user_id:data["user_id"]}}).then((result) => {
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
        await model.NithyaThadiyarathanaiBookings.findAll({ where: {id: data["id"] } }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get data.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

// User Website Api

module.exports = {
    createPrice: createPrice,
    getPrice: getPrice,
    deletePrice: deletePrice,
    bookings:bookings,
    newBooking: newBooking,
    myBookings:myBookings,
    getBookingDetail:getBookingDetail,
    getAllPrice:getAllPrice

}