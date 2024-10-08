const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const imageRouter=require('./routes/image_routes');
const authRouter = require("./routes/auth_routes");
const statusRouter = require("./routes/booking_status_routes");
const dateRouter = require("./routes/date_routes");
const nithyaThadiyarathanaiRouter = require('./routes/nithya_thadiyarathanai_routes');
const poornaUbayamRouter = require('./routes/poorna_ubayam_routes');
const swathiRouter = require('./routes/swathi_routes');
const pradhoshamRouter = require('./routes/pradhosham_routes');
const azvarRouter = require('./routes/azvar_routes');
const azagiyasingarRouter = require('./routes/azagiyasingar_routes');
const samashrayanamRouter = require('./routes/samashrayanam_routes');
const bharanyasamRouter = require('./routes/bharanyasam_routes');
const goodaraivalliRouter = require('./routes/goodaraivalli_routes');
const ponnadiRouter = require('./routes/ponnadi_routes');
const homeDolaiRouter = require('./routes/home_dolai_routes');
const sannadhiDolaiRouter = require('./routes/sannadhi_dolai_routes');
const sixtyThadiRouter = require('./routes/sixty_thadi_routes');
const chatruNithyaThadiRouter = require('./routes/chatru_nithya_thadi_routes');
const myBookingsRouter = require('./routes/my_bookings_routes');
const projectRouter = require('./routes/project_routes');
const locationRouter=require('./routes/location_routes');
const baseDataRouter=require('./routes/base_data_master_routes');
const thirunakshatramRouter=require('./routes/thirunakshatram_routes');
const kainkaryamRouter=require('./routes/kainkaryam_routes');
const flashMessageRouter=require('./routes/flash_message_routes');
const bookingDescriptionRouter=require('./routes/booking_description_routes');
const groupRouter=require('./routes/group_routes');
const categoryRouter=require('./routes/member_category_routes');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'));

// Routes
app.use("/api/image",imageRouter);
app.use("/api/auth", authRouter);
app.use("/api/status",statusRouter)
app.use("/api/date", dateRouter);
app.use("/api/nithyaThadiyarathanai", nithyaThadiyarathanaiRouter);
app.use("/api/poornaUbayam", poornaUbayamRouter);
app.use("/api/swathi", swathiRouter);
app.use("/api/pradhosham", pradhoshamRouter);
app.use("/api/azvar",azvarRouter);
app.use("/api/azagiyasingar",azagiyasingarRouter);
app.use('/api/samashrayanam', samashrayanamRouter);
app.use('/api/bharanyasam', bharanyasamRouter);
app.use('/api/goodaraivalli', goodaraivalliRouter);
app.use('/api/ponnadi', ponnadiRouter);
app.use('/api/homeDolai', homeDolaiRouter);
app.use('/api/sannadhiDolai', sannadhiDolaiRouter);
app.use('/api/sixtyThadi', sixtyThadiRouter);
app.use('/api/chatruNithyaThadi', chatruNithyaThadiRouter);
app.use('/api/myBookings',myBookingsRouter);
app.use('/api/project',projectRouter);
app.use('/api/location',locationRouter);
app.use('/api/base_data',baseDataRouter);
app.use('/api/thirunakshatram',thirunakshatramRouter);
app.use('/api/kainkaryam',kainkaryamRouter);
app.use('/api/flashMessage',flashMessageRouter);
app.use('/api/description',bookingDescriptionRouter);
app.use('/api/group',groupRouter);
app.use('/api/category',categoryRouter);

module.exports = app;

