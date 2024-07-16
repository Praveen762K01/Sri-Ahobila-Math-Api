const { Op } = require('sequelize');
const model = require('../models');

// Admin Portal Api
createDatePrice = async (req, res) => {
    try {
        const data = {
            date: req.body.date,
            price: req.body.price,
            is_active: true
        };

        const _date = new Date();
        const year = _date.getFullYear();
        const month =  (_date.getMonth() + 1)<10?('0'+ (_date.getMonth() + 1)): _date.getMonth() + 1;
        const date = _date.getDate();
        const currentDate = year + "-" + month+ "-" + date;

        // Validate if from_date is today or in the future
        if (data["date"] < currentDate) {
            return res.status(500).json({ message: "Date must be today or in the future." });
        }

        const existingPrice = await model.PradhoshamPrice.findOne({ where: { date: data.date } });

        if (existingPrice) {
            return res.status(500).json({ message: "Price with this date already exists." });
        }

        await model.PradhoshamPrice.create(data)
            .then((result) => {
                return res.status(200).json({ message: "Pradhosham Price Created Successfully." });
            })
            .catch((err) => {
                return res.status(500).json({ message: "Not able to create price.", error: err });
            });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
};

getDatePrice = async (req, res) => {
    const dateFormat = new Date();
    const formattedCurrentDate = dateFormat.toISOString().split('T')[0];
    try {
        const prices = await model.PradhoshamPrice.findAll({
            where: {
                date: {
                    [Op.gte]: formattedCurrentDate
                }
            },
            order: [
                ['date', 'ASC']
            ]
        });

        if (prices.length > 0) {
            return res.status(200).json(prices);
        } else {
            return res.status(500).json({ message: "No price found for Pradhosham. Please contact admin." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
};


getAllDatePrice = async (req, res) => {
    try {
        await model.PradhoshamPrice.findAll({order: [
            ['date', 'ASC']
        ]}).then((result) => {
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
        await model.PradhoshamPrice.findOne({ where: { id: data["id"] } }).then((result) => {
            if (result) {
                model.PradhoshamPrice.destroy({ where: { id: data["id"] } }).then((x) => {
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

allBookings = async (req, res) => {
    try {
        await model.PradhoshamBookings.findAll().then((result) => {
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
            price_id:req.body.price_id,
            payment_id:req.body.payment_id,
            is_approved: "Booked",
            is_paid:false,
            approved_by:""
        }
        await model.PradhoshamBookings.create(data).then((result) => {
            return res.status(200).json({ message: "Pradhosham Booked Successfully." });
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
        await model.PradhoshamBookings.findAll({ where: { user_id: data["user_id"] } }).then((result) => {
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
        await model.PradhoshamBookings.findAll({ where: { id: data["id"] } }).then((result) => {
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
    myBookings: myBookings,
    getBookingDetail: getBookingDetail,
    getAllDatePrice: getAllDatePrice
}