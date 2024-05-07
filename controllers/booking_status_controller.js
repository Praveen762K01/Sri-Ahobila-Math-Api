const model = require('../models');


allBookingsStatus=async(req,res)=>{
    try {
        await model.BookingStatus.findAll().then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get data.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}


module.exports = {
    allBookingsStatus: allBookingsStatus
}