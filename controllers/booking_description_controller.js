const model = require('../models');

const createDescription = async (req, res) => {
    try {
        const data = {
            description: req.body.description,
            booking_type: req.body.booking_type,
            image:req.body.image,
            created_by: req.body.created_by,
            is_active: true
        };
        console.log(data);

        await model.BookingDescription.update({ is_active: false }, {
            where: {
                booking_type: data.booking_type
            }
        });

        await model.BookingDescription.create(data);

        return res.status(200).json({ message: "Description Created Successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error.message });
    }
};

getBookingDescription = async (req, res) => {
    const data = {
        booking_type:req.body.booking_type
    }
    try {
           await model.BookingDescription.findOne({where:{is_active:true,booking_type:data["booking_type"]}}).then(async(result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllDescription = async (req, res) => {
    try {
           await model.BookingDescription.findAll().then(async(result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

module.exports = {
    createDescription:createDescription,
    getBookingDescription:getBookingDescription,
    getAllDescription:getAllDescription
   
}