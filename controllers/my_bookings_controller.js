const model = require('../models');

const myBookings = async (req, res) => {
    try {
        const userId = req.body.user_id;

        const bookingsPromises = [
            { model: model.BharanyasamBookings, name: "Bharanyasam" },
            { model: model.Chatru_NithyaThadi_Transaction_Table, name: "Chatru NithyaThadi" ,endPoint:"chatruNithyaThadi"},
            { model: model.FirstThirunakshatramBookings, name: "First Thirunakshatram" },
            { model: model.FourtyFiveKainkaryamBookings, name: "45 Kainkaryam" },
            { model: model.FourtyFiveThirunakshatramBookings, name: "44 Thirunakshatram" },
            { model: model.FourtyFourKainkaryamBookings, name: "44 Kainkaryam" },
            { model: model.FourtyFourThirunakshatramBookings, name: "44 Thirunakshatram" },
            { model: model.FourtySixThirunakshatramBookings, name: "46 Thirunakshatram" },
            { model: model.Goodaraivalli_Transaction_Table, name: "Goodaraivalli",endPoint:"goodaraivalli" },
            { model: model.HomeDolai_Transaction_Table, name: "Dolai" ,endPoint:"dolai"},
            { model: model.NithyaThadiyarathanaiBookings, name: "Nithya Thadiyarathanai" },
            { model: model.Ponnadi_Transaction_Table, name: "Ponnadi" ,endPoint:"ponnadi"},
            { model: model.PoornaUbayamBookings, name: "Poorna Ubayam" ,endPoint:"poornaUbayam"},
            { model: model.PradhoshamBookings, name: "Pradhosham" },
            { model: model.SamashrayanamBookings, name: "Samashrayanam" },
            { model: model.SannadhiDolai_Transaction_Table, name: "Sannadhi Dolai" ,endPoint:"sannadhiDolai"},
            { model: model.SixtyThadi_Transaction_Table, name: "60 Day Thadiyarathanai",endPoint:"sixtyThadi" },
            { model: model.SwathiBookings, name: "Swathi" }
        ];

        const bookingsResults = await Promise.all(bookingsPromises.map(async ({ model, name,endPoint }) => {
            const bookings = await model.findAll({ where: { user_id: userId } });
            // Add booking_name to each booking object
            return bookings.map(booking => ({ ...booking.toJSON(), booking_name: name,end_point:endPoint }));
        }));

        // Flatten the array of arrays into a single array
        const allBookings = bookingsResults.flat();

        return res.status(200).json(allBookings);
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

const pendingApprovalCount = async (req, res) => {
    try {
        const userId = req.body.user_id;

        const bookingsPromises = [
            { model: model.BharanyasamBookings, name: "Bharanyasam",endPoint: "bharanyasam" },
            { model: model.Chatru_NithyaThadi_Transaction_Table, name: "Chatru NithyaThadi", endPoint: "chatruNithyaThadi" },
            { model: model.ThirunakshatramTransactions, name: "Thirunakshatram", endPoint: "thirunakshatram" },
            { model: model.KainkaryamTransactions, name: "Kainkaryam", endPoint: "kainkaryam"  },
            { model: model.Goodaraivalli_Transaction_Table, name: "Goodaraivalli", endPoint: "goodaraivalli" },
            { model: model.HomeDolai_Transaction_Table, name: "Home Dolai", endPoint: "homeDolai" },
            { model: model.NithyaThadiyarathanaiBookings, name: "Nithya Thadiyarathanai", endPoint:"nithyaThadiyarathanai" },
            { model: model.Ponnadi_Transaction_Table, name: "Ponnadi", endPoint: "ponnadi" },
            { model: model.PoornaUbayamBookings, name: "Poorna Ubayam", endPoint: "poornaUbayam" },
            { model: model.PradhoshamBookings, name: "Pradhosham", endPoint:"pradhosham" },
            { model: model.SamashrayanamBookings, name: "Samashrayanam", endPoint:"samashrayanam" },
            { model: model.SannadhiDolai_Transaction_Table, name: "Sannadhi Dolai", endPoint: "sannadhiDolai" },
            { model: model.SixtyThadi_Transaction_Table, name: "60 Day Thadiyarathanai", endPoint: "sixtyThadi" },
            { model: model.SwathiBookings, name: "Swathi", endPoint:"swathi" }
        ];

        const bookingsCounts = await Promise.all(bookingsPromises.map(async ({ model, name, endPoint }) => {
            const count = await model.count({ where: { is_approved: "Booked" } });
            return { booking_name: name, count, end_point: endPoint };
        }));

        return res.status(200).json(bookingsCounts);
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error.message });
    }
};

approveRejectBookingStatus = async (req, res) => {
    try {
        const data = {
            end_point: req.body.end_point,
            user_id: req.body.user_id,
            booking_id: req.body.booking_id,
            is_approved: req.body.is_approved,
            approved_by: req.body.approved_by,
            is_paid: req.body.is_paid
        };

        let bookingStatusUpdateModelToUse;

        // Determine which model to use based on end_point
        switch (data["end_point"]) {
            case "nithyaThadiyarathanai":
                bookingStatusUpdateModelToUse = model.NithyaThadiyarathanaiBookings;
                break;
            case "poornaUbayam":
                bookingStatusUpdateModelToUse = model.PoornaUbayamBookings;
                break;
            case "swathi":
                bookingStatusUpdateModelToUse = model.SwathiBookings;
                break;
            case "pradhosham":
                bookingStatusUpdateModelToUse = model.PradhoshamBookings;
                break;
            case "homeDolai":
                bookingStatusUpdateModelToUse = model.HomeDolai_Transaction_Table;
                break;
            case "sannadhiDolai":
                bookingStatusUpdateModelToUse = model.SannadhiDolai_Transaction_Table;
                break;
            case "ponnadi":
                bookingStatusUpdateModelToUse = model.Ponnadi_Transaction_Table;
                break;
            case "goodaraivalli":
                bookingStatusUpdateModelToUse = model.Goodaraivalli_Transaction_Table;
                break;
            case "sixtyThadi":
                bookingStatusUpdateModelToUse = model.SixtyThadi_Transaction_Table;
                break;
            case "chatruNithyaThadi":
                bookingStatusUpdateModelToUse = model.Chatru_NithyaThadi_Transaction_Table;
                break;
            case "samashrayanam":
                bookingStatusUpdateModelToUse = model.SamashrayanamBookings;
                break;
            case "bharanyasam":
                bookingStatusUpdateModelToUse = model.BharanyasamBookings;
                break;
            default:
                return res.status(400).json({ message: "Invalid end_point provided." });
        }

        // Update the booking using the determined model
        await bookingStatusUpdateModelToUse.update(
            {
                is_approved: data["is_approved"],
                approved_by: data["approved_by"],
                is_paid: data["is_paid"]
            },
            { where: { id: data["booking_id"], user_id: data["user_id"] } }
        )
            .then((result) => {
                return res.status(200).json({ message: "Data updated Successfully" });
            })
            .catch((err) => {
                return res.status(500).json({ message: "Not able to update booking.", error: err });
            });

    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

module.exports = {
    myBookings:myBookings,
    pendingApprovalCount:pendingApprovalCount,
    approveRejectBookingStatus:approveRejectBookingStatus
};
