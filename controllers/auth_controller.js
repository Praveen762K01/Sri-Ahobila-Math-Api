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

sendOtp = async (req, res) => {
    try {
        const data = {
            mobile: req.body.mobile,
            email_address: req.body.email_address
        }
        await model.UserData.findOne({ where: { mobile_number: data["mobile"] } }).then((result) => {
            if (result && result.is_registered == true) {
                // return res.status(201).json({ message: "User already found", details: result });
                // const otp = generateOTP();
                // user_mobile = data["mobile"];
                // model.UserData.update({ otp: otp }, {
                //     where: {
                //         mobile_number: data["mobile"]
                //     }
                // }).then((result) => {
                //     const mailOptions = {
                //         from: 'vrukshamnotifications@gmail.com',
                //         to: data["email_address"],
                //         subject: 'Your OTP for verification',
                //         text: `Your OTP is: ${otp}`
                //     };
                //     transporter.sendMail(mailOptions);
                return res.status(500).json({ message: "User already registered. Please Login", otp: otp, mail: data["email_address"], mobile: data["mobile"] });
                // }).catch((err) => {
                //     return res.status(500).json({ message: "Not able to store data or send email", error: err });
                // });
            } else
                if (result && result.is_registered == false) {
                    const otp = generateOTP();
                    user_mobile = data["mobile"];
                    model.UserData.update({ otp: otp }, {
                        where: {
                            mobile_number: data["mobile"]
                        }
                    }).then((result) => {
                        const mailOptions = {
                            from: 'vrukshamnotifications@gmail.com',
                            to: data["email_address"],
                            subject: 'Your OTP for verification',
                            text: `Your OTP is: ${otp}`
                        };
                        transporter.sendMail(mailOptions);
                        return res.status(200).json({ message: "Otp Sent Successfully", otp: otp, mail: data["email_address"], mobile: data["mobile"] });
                    }).catch((err) => {
                        return res.status(500).json({ message: "Not able to store data or send email", error: err });
                    });
                } else {
                    const otp = generateOTP();
                    user_mobile = data["mobile"];
                    model.UserData.create({
                        mobile_number: data["mobile"],
                        email_address: data["email_address"],
                        otp: otp,
                        is_registered: false
                    }).then((result) => {
                        const mailOptions = {
                            from: 'vrukshamnotifications@gmail.com',
                            to: data["email_address"],
                            subject: 'Your OTP for verification',
                            text: `Your OTP is: ${otp}`
                        };
                        transporter.sendMail(mailOptions);
                        return res.status(200).json({ message: "Otp Sent Successfully to your registered mail id.", otp: otp, mail: data["email"], mobile: data["mobile"] });
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

createMobileUser = async (req, res) => {
    try {
        const data = {
            mobile: req.body.mobile,
            email_address: req.body.email_address
        }
        const apiKey = "L0GfjLmTg0e5668GhoCgEQ"; // Use your API key here
        const apiSender = "MARSKY";
        const otp = generateOTP(); // Example OTP variable
        const mobile = data["mobile"]; // Example mobile number
        const msg = `${otp} is your One-Time Password (OTP).\n-Sky Marketing`;
        const num = mobile;
        const ms = encodeURIComponent(msg);
        const url =
            `https://www.smsc.co.in/api/mt/SendSMS?APIKey=${apiKey}&senderid=${apiSender}&channel=2&DCS=0&flashsms=0&number=${num}&text=${ms}&route=44&EntityId=1101442370000075992&dlttemplateid=1107171851093422866`;

        await model.UserData.findOne({ where: { mobile_number: data["mobile"] } }).then((result) => {
            if (result && result.is_registered == true) {
                return res.status(500).json({ message: "User already registered. Please Login", otp: otp, mail: data["email_address"], mobile: data["mobile"] });
            } else
                if (result && result.is_registered == false) {
                    user_mobile = data["mobile"];
                    model.UserData.update({ otp: otp }, {
                        where: {
                            mobile_number: data["mobile"]
                        }
                    }).then(async (result) => {
                        const response = await fetch(url, {
                            method: 'POST',
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        } else {
                            const data = await response.text();
                            return res.status(200).json({ message: data });
                        }
                    }).catch((err) => {
                        return res.status(500).json({ message: "Not able to store data or send email", error: err });
                    });
                } else {
                    user_mobile = data["mobile"];
                    model.UserData.create({
                        mobile_number: data["mobile"],
                        email_address: data["email_address"],
                        otp: otp,
                        is_registered: false
                    }).then(async (result) => {
                        const response = await fetch(url, {
                            method: 'POST',
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        } else {
                            const data = await response.text();
                            return res.status(200).json({ message: data });
                        }
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
            email_address: req.body.email_address,
            otp: req.body.otp
        }

        await model.UserData.findOne({ where: { mobile_number: data["mobile"] } }).then((result) => {
            const givenTime = new Date(result.updatedAt);
            const currentTime = new Date();
            const timeDifferenceMs = currentTime - givenTime;
            const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);
            if (result && result["email_address"] == data["email_address"]) {
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
        let id = 0;
        await model.UserData.findOne({ where: { mobile_number: req.body.mobile_number } }).then((result) => {
            id = result.id;
        }).catch((err) => {
            return res.status(500).json({ message: "Please try again later.", error: err });
        });
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const date = currentDate.getDate();
        const user_id = "SAMATH" + date + month + year + id;
        const data = {
            name: req.body.name,
            mobile_number: req.body.mobile_number,
            address: req.body.address,
            country_id: req.body.country_id,
            country: req.body.country,
            state_id: req.body.state_id,
            state: req.body.state,
            city_id: req.body.city_id,
            city: req.body.city,
            area: req.body.area,
            pincode: req.body.pincode,
            gender: req.body.gender,
            dob: req.body.dob,
            tamil_star_id: req.body.tamil_star_id,
            tamil_star: req.body.tamil_star,
            gothram: req.body.gothram,
            samashrayanam: req.body.samashrayanam,
            samashrayanam_pattam: req.body.samashrayanam_pattam,
            bharanyasam: req.body.bharanyasam,
            bharanyasam_pattam: req.body.bharanyasam_pattam,
            profile_image: req.body.profile_image,
            password: req.body.password,
            user_id: user_id,
            whatsapp_number: "",
            user_approved: false,
            user_status_id: "",
            user_status: "",
            is_registered: true,
            is_active: false,
            is_rejected: false
        }

        await model.UserData.update(data, {
            where: {
                mobile_number: data["mobile_number"]
            }
        }).then((result) => {
            return res.status(200).json({ message: "Account has been created successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to signup", error: err });
        });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, Please try again later.", error: error });
    }
}

checkUser = async (req, res) => {
    try {
        const data = {
            mobile_number: req.body.mobile_number
        }
        await model.UserData.findOne({ where: { mobile_number: data["mobile_number"] } }).then((result) => {
            if (result) {
                return res.status(200).json({ message: "User Data Found."});
            }else{
                return res.status(500).json({ message: "No data found.", error: err });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Please try again later.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, Please try again later.", error: error });
    }
}

registerAdmin = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            email_address: req.body.email_address,
            mobile_number: req.body.mobile_number,
            address: req.body.address,
            country_id: req.body.country_id,
            country: req.body.country,
            state_id: req.body.state_id,
            state: req.body.state,
            city_id: req.body.city_id,
            city: req.body.city,
            area: req.body.area,
            pincode: req.body.pincode,
            gender: req.body.gender,
            dob: req.body.dob,
            tamil_star_id: req.body.tamil_star_id,
            tamil_star: req.body.tamil_star,
            gothram: req.body.gothram,
            samashrayanam: req.body.samashrayanam,
            samashrayanam_pattam: req.body.samashrayanam_pattam,
            bharanyasam: req.body.bharanyasam,
            bharanyasam_pattam: req.body.bharanyasam_pattam,
            profile_image: req.body.profile_image,
            password: req.body.password,
            user_id: "",
            whatsapp_number: "",
            user_approved: false,
            user_status_id: "0",
            user_status: "Admin",
            is_registered: true,
            is_active: false,
            is_rejected: false
        }

        await model.UserData.create(data).then((result) => {
            return res.status(200).json({ message: "Account has been created successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to signup", error: err });
        });

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

        if (data["mobile"].length == 10) {
            await model.UserData.findOne({
                where: {
                    mobile_number: data["mobile"]
                }
            }).then((result) => {
                if (result.is_active === false) {
                    return res.status(500).json({ message: " Your Registration is pending for approval. Please try after some time." });
                }
                if (result.password == data["password"]) {

                    return res.status(200).json({ message: "Login Successful.", result: result });
                } else {
                    return res.status(500).json({ message: "Incorrect Password." });
                }
            })
                .catch((err) => {

                    return res.status(500).json({ message: "User Not Found.", error: err });
                });
        } else {
            return res.status(500).json({ message: "Invalid mobile number." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong, Please try again later22.", error: error });
    }
}


memberApprovalList = async (req, res) => {
    try {
        model.UserData.findAll({ where: { is_registered: true, user_approved: false, is_rejected: false } }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "No Data Found" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
    }
}

approveUser = async (req, res) => {
    const data = {
        user_id: req.body.user_id,
        user_approved: req.body.user_approved,
        is_rejected: req.body.is_rejected,
        is_active: req.body.is_active,
        email_address: req.body.email_address
    };

    try {
        model.UserData.update({
            user_approved: data["user_approved"],
            is_rejected: data["is_rejected"],
            is_active: data["is_active"]
        }, {
            where: {
                user_id: data["user_id"]
            }
        }).then((result) => {

            const mailOptions = {
                from: 'vrukshamnotifications@gmail.com',
                to: data["email_address"],
                subject: 'Account Verified Successfully.',
                text: `Your Account for Sri Ahobila Math is now approved.`
            };
            transporter.sendMail(mailOptions);
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "No Data Found" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
    }
}

usersList = async (req, res) => {
    try {
        model.UserData.findAll({ where: { is_registered: true, user_approved: true } }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "No Data Found" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
    }
}

activeUsersList = async (req, res) => {
    try {
        model.UserData.findAll({ where: { is_registered: true, user_approved: true, is_active: true } }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "No Data Found" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
    }
}

inActiveUsersList = async (req, res) => {
    try {
        model.UserData.findAll({ where: { is_registered: true, user_approved: true, is_active: false } }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "No Data Found" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
    }
}

activateDeactivateUser = async (req, res) => {
    const data = {
        user_id: req.body.user_id,
        is_active: req.body.is_active
    };
    try {
        model.UserData.update({ is_active: data["is_active"] }, {
            where: {
                user_id: data["user_id"]
            }
        }).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "No Data Found" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong" });
    }
}


myProfile = async (req, res) => {
    try {
        const data = {
            userId: req.body.userId
        }
        model.UserData.findOne({ where: { user_id: data["userId"] } }).then((result) => {
            return res.status(200).json({ result: result });
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
    myProfile: myProfile,
    memberApprovalList: memberApprovalList,
    approveUser: approveUser,
    usersList: usersList,
    activeUsersList: activeUsersList,
    inActiveUsersList: inActiveUsersList,
    activateDeactivateUser: activateDeactivateUser,
    createMobileUser: createMobileUser,
    registerAdmin: registerAdmin,
    checkUser:checkUser
}