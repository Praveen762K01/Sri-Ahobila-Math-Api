const model = require('../models');

getThirunakshatramDate = async (req, res) => {
    try {
        const thirunakshatram = [
            { model: model.AzvarMaster, name: "Azvar" },
            { model: model.AzagiyasingarMaster, name: "Azagiyasingar" },
        ];
        const thirunakshatramResults = await Promise.all(thirunakshatram.map(async ({ model, name }) => {
            const availableThirunakshatram = await model.findAll({
                where: {
                    is_active: true,
                    thirunakshatram: true,
                }
            });
            // Add booking_name to each booking object
            return availableThirunakshatram.map(booking => ({ ...booking.toJSON(), thirunakshatram_name: name }));
        }));

        // Flatten the array of arrays into a single array
        const allThirunakshatramDates = thirunakshatramResults.flat();

        if (allThirunakshatramDates.length > 0) {
            return res.status(200).json(allThirunakshatramDates);
        } else {
            return res.status(500).json({ message: "No price found for Thirunakshatram. Please contact admin." });
        }

    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getKainkaryamDate = async (req, res) => {
    try {
        const kainkaryam = [
            { model: model.AzvarMaster, name: "Azvar" },
            { model: model.AzagiyasingarMaster, name: "Azagiyasingar" },
        ];
        const kainkaryamResults = await Promise.all(kainkaryam.map(async ({ model, name }) => {
            const availableKainkaryam = await model.findAll({
                where: {
                    is_active: true,
                    kainkaryam: true,
                }
            });
            // Add booking_name to each booking object
            return availableKainkaryam.map(booking => ({ ...booking.toJSON(), kainkaryam_name: name }));
        }));

        // Flatten the array of arrays into a single array
        const allKainkaryamDates = kainkaryamResults.flat();
        if (allKainkaryamDates.length > 0) {
            return res.status(200).json(allKainkaryamDates);
        } else {
            return res.status(500).json({ message: "No price found for Kainkaryam. Please contact admin." });
        }

    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

newThirunakshatramBooking = async (req, res) => {
    try {
        const data = {
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            mail_id: req.body.mail_id,
            mobile_number: req.body.mobile_number,
            address: req.body.address,
            price: req.body.price,
            name: req.body.name,
            payment_id: req.body.payment_id,
            message: req.body.message,
            thirunakshatram_id: req.body.thirunakshatram_id,
            thirunakshatram_type: req.body.thirunakshatram_type,
            is_approved: "Booked",
            is_paid: false,
            approved_by: ""
        }
        console.log(data);
        await model.ThirunakshatramTransactions.create(data).then((result) => {
            return res.status(200).json({ message: "Thirunakshatram Booked Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to book.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

newKainkaryamBooking = async (req, res) => {
    try {
        const data = {
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            mail_id: req.body.mail_id,
            mobile_number: req.body.mobile_number,
            address: req.body.address,
            price: req.body.price,
            name: req.body.name,
            payment_id: req.body.payment_id,
            message: req.body.message,
            kainkaryam_id: req.body.kainkaryam_id,
            kainkaryam_type: req.body.kainkaryam_type,
            is_approved: "Booked",
            is_paid: false,
            approved_by: ""
        }
        console.log(data);
        await model.KainkaryamTransactions.create(data).then((result) => {
            return res.status(200).json({ message: "Kainkaryam Booked Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to book.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllThirunakshatramBookings= async (req, res) => {
    try {
        await model.ThirunakshatramTransactions.findAll().then((result) => {
            if(result.length>0){
                return res.status(200).json(result);
            }else{
                return res.status(200).json({ message: "Not data found.", error: err });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllKainkaryamBookings= async (req, res) => {
    try {
        await model.KainkaryamTransactions.findAll().then((result) => {
            if(result.length>0){
                return res.status(200).json(result);
            }else{
                return res.status(200).json({ message: "Not data found.", error: err });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get price.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}



module.exports = {
    getThirunakshatramDate: getThirunakshatramDate,
    getKainkaryamDate: getKainkaryamDate,
    newThirunakshatramBooking: newThirunakshatramBooking,
    newKainkaryamBooking: newKainkaryamBooking,
    getAllThirunakshatramBookings:getAllThirunakshatramBookings,
    getAllKainkaryamBookings:getAllKainkaryamBookings
}