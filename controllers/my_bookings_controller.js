const model = require('../models');

const myBookings = async (req, res) => {
    try {
        const userId = req.body.user_id;

        const bookingsPromises = [
            { model: model.BharanyasamBookings, name: "Bharanyasam" },
            { model: model.Chatru_NithyaThadi_Transaction_Table, name: "Chatru NithyaThadi" },
            { model: model.FirstThirunakshatramBookings, name: "First Thirunakshatram" },
            { model: model.FourtyFiveKainkaryamBookings, name: "45 Kainkaryam" },
            { model: model.FourtyFiveThirunakshatramBookings, name: "44 Thirunakshatram" },
            { model: model.FourtyFourKainkaryamBookings, name: "44 Kainkaryam" },
            { model: model.FourtyFourThirunakshatramBookings, name: "44 Thirunakshatram" },
            { model: model.FourtySixThirunakshatramBookings, name: "46 Thirunakshatram" },
            { model: model.Goodaraivalli_Transaction_Table, name: "Goodaraivalli" },
            { model: model.HomeDolai_Transaction_Table, name: "Dolai" },
            { model: model.NithyaThadiyarathanaiBookings, name: "Nithya Thadiyarathanai" },
            { model: model.Ponnadi_Transaction_Table, name: "Ponnadi" },
            { model: model.PoornaUbayamBookings, name: "Poorna Ubayam" },
            { model: model.PradhoshamBookings, name: "Pradhosham" },
            { model: model.SamashrayanamBookings, name: "Samashrayanam" },
            { model: model.SannadhiDolai_Transaction_Table, name: "Sannadhi Dolai" },
            { model: model.SixtyThadi_Transaction_Table, name: "60 Day Thadiyarathanai" },
            { model: model.SwathiBookings, name: "Swathi" }
        ];

        const bookingsResults = await Promise.all(bookingsPromises.map(async ({ model, name }) => {
            const bookings = await model.findAll({ where: { user_id: userId } });
            // Add booking_name to each booking object
            return bookings.map(booking => ({ ...booking.toJSON(), booking_name: name }));
        }));

        // Flatten the array of arrays into a single array
        const allBookings = bookingsResults.flat();

        return res.status(200).json(allBookings);
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}


module.exports = {
    myBookings:myBookings
};
