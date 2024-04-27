const model = require('../models');

// Admin Portal Api
createDatePrice = async (req, res) => {
    try {
        const data = {
            date: req.body.date,
            price: req.body.price,
            is_active: true
        }
        await model.SwathiPrice.create(data).then((result) => {
            return res.status(200).json({ message: "Price Created Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to create price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getDatePrice = async (req, res) => {
    try {
        await model.SwathiPrice.findAll().then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

deleteDatePrice = async (req, res) => {
    try {
        const data = {
            id: req.body.id
        }
        await model.SwathiPrice.findOne({ where: { id: data["id"] } }).then((result) => {
            if (result) {
                model.SwathiPrice.destroy({ where: { id: data["id"] } }).then((x) => {
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
allBookings=async(req,res)=>{
    try {
        await model.SwathiBookings.findAll().then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get data.", error: err });
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
            date: req.body.date,
            price: req.body.price,
            booking_count: req.body.booking_count,
            total_value: req.body.total_value,
            message: req.body.message,
            is_approved: false,
            is_paid: false
        }
        await model.SwathiBookings.create(data).then((result) => {
            return res.status(200).json({ message: "Swathi Booked Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to book.", error: err });
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
        await model.SwathiBookings.findAll({ where: { user_id: data["user_id"] } }).then((result) => {
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
    createDatePrice: createDatePrice,
    getDatePrice: getDatePrice,
    deleteDatePrice: deleteDatePrice,
    allBookings: allBookings,
    newBooking: newBooking,
    myBookings: myBookings
}