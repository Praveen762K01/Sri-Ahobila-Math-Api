const nodemailer = require('nodemailer');
const model = require('../models');

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vrukshamnotifications@gmail.com',
        pass: 'kngzjpoesgrihkrx'
    }
});

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

let user_mobile = "";
let id = 0;
sendOtp = async (req, res) => {
    try {
        const data = {
            mobile: req.body.mobile,
            email: req.body.email
        }
        await model.UserData.findOne({ where: { mobile_number: data["mobile"] } }).then((result) => {
            if (result && result.is_registered == true) {
                // return res.status(201).json({ message: "User already found", details: result });
                const otp = generateOTP();
                user_mobile = data["mobile"];
                model.UserData.update({ otp: otp }, {
                    where: {
                        mobile_number: data["mobile"]
                    }
                }).then((result) => {
                    const mailOptions = {
                        from: 'vrukshamnotifications@gmail.com',
                        to: data["email"],
                        subject: 'Your OTP for verification',
                        text: `Your OTP is: ${otp}`
                    };
                    transporter.sendMail(mailOptions);
                    return res.status(200).json({ message: "Otp Sent Successfully", otp: otp, mail: data["email"],mobile:data["mobile"] });
                }).catch((err) => {
                    return res.status(500).json({ message: "Not able to store data or send email1", error: err });
                });
            } else if (result && result.is_registered == false) {
                const otp = generateOTP();
                user_mobile = data["mobile"];
                model.UserData.update({ otp: otp }, {
                    where: {
                        mobile_number: data["mobile"]
                    }
                }).then((result) => {
                    const mailOptions = {
                        from: 'vrukshamnotifications@gmail.com',
                        to: data["email"],
                        subject: 'Your OTP for verification',
                        text: `Your OTP is: ${otp}`
                    };
                    transporter.sendMail(mailOptions);
                    return res.status(200).json({ message: "Otp Sent Successfully", otp: otp, mail: data["email"],mobile:data["mobile"] });
                }).catch((err) => {
                    return res.status(500).json({ message: "Not able to store data or send email1", error: err });
                });
            } else {
                const otp = generateOTP();
                user_mobile = data["mobile"];
                model.UserData.create({
                    mobile_number: data["mobile"],
                    mail_id: data["email"],
                    otp: otp,
                    is_registered: false
                }).then((result) => {
                    const mailOptions = {
                        from: 'vrukshamnotifications@gmail.com',
                        to: data["email"],
                        subject: 'Your OTP for verification',
                        text: `Your OTP is: ${otp}`
                    };
                    transporter.sendMail(mailOptions);
                    return res.status(200).json({ message: "Otp Sent Successfully to your registered mail id.", otp: otp, mail: data["email"],mobile:data["mobile"] });
                }).catch((err) => {
                    return res.status(500).json({ message: "Not able to store data or send email2", error: err });
                });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to read data", error: err });
        });

    } catch (error) {
        return res.status(500).json({ message: "Not able to sent otp", error: error });
    }
}

verifyOtp = async (req, res) => {
    try {
        const data = {
            mobile: req.body.mobile,
            email: req.body.email,
            otp: req.body.otp
        }
        await model.UserData.findOne({ where: { mobile_number: data["mobile"] } }).then((result) => {
            id = result.id;
            const givenTime = new Date(result.updatedAt);
            const currentTime = new Date();
            const timeDifferenceMs = currentTime - givenTime;
            const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);
            if (result && result["mail_id"]==data["email"]) {
                if (timeDifferenceMinutes <= 2) {
                    if (result.otp == data["otp"]) {
                        return res.status(200).json({ message: "Otp Verified Successfully", status: result["is_registered"] });
                    } else {
                        return res.status(500).json({ message: "Incorrect Otp" });
                    }
                } else {
                    return res.status(500).json({ message: "Time Out" });
                }
            } else {
                return res.status(500).json({ message: "No Data Found" });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Please try again later.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Not able to verify, Please try again later.", error: error });
    }
}

registerUser = async (req, res) => {
    try {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const date = currentDate.getDate();
        const user_id = "SAMATH" + date + month + year + id;
        const date_of_birth = req.body.dob.split("-").reverse().join("-");
        
        const data = {
            name: req.body.name,
            dob: date_of_birth,
            gender: req.body.gender,
            address: req.body.address,
            city: req.body.city,
            district: req.body.district,
            state: req.body.state,
            postal_code: req.body.postal_code,
            user_id: user_id,
            country: req.body.country,
            // whatsapp_number: req.body.whatsapp_number,
            mobile_number: req.body.whatsapp_number,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            is_registered: true,
            category: req.body.category
        }
        
        if (data["password"] == data["confirm_password"]) {
            
            await model.UserData.update(data, {
                where: {
                    mobile_number:data["mobile_number"]
                }
            }).then((result) => {
                return res.status(200).json({ message: "Account has been created successfully." });
            }).catch((err) => {
                return res.status(500).json({ message: "Not able to signup", error: err });
            });
        } else {
            return res.status(500).json({ message: "Password Mismatch", error: err });
        }

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, Please try again later.", error: error });
    }
}

login = async (req, res) => {
    try {
        const data = {
            mobile: req.body.mobile,
            password: req.body.password
        }
        console.log(data["mobile"].length == 10);
        if (data["mobile"].length == 10) {
            console.log("inside");
            await model.UserData.findOne({
                where: {
                    mobile_number: data["mobile"]
                }
            }).then((result) => {
                if (result.password == data["password"]) {

                    return res.status(200).json({ message: "Login Successful.", result: result });
                } else {
                    return res.status(500).json({ message: "Incorrect Password." });
                }
            })
            .catch((err) => {

                return res.status(500).json({ message: "Something went wrong, Please try again later11.", error: err });
            });
        } else {
            return res.status(500).json({ message: "Invalid mobile number." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong, Please try again later22.", error: error });
    }
}

myProfile=async(req,res)=>{
    try {
        const data={
            userId:req.body.userId
        }
        model.UserData.findOne({where:{user_id:data["userId"]}}).then((result) => {
            return res.status(200).json({result: result });
        }).catch((err) => {
            return res.status(500).json({ message: "No Data Found" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
    }
}


module.exports = {
    sendOtp: sendOtp,
    verifyOtp: verifyOtp,
    registerUser: registerUser,
    login: login,
    myProfile:myProfile
}