const model = require('../models');

createDate = async (req, res) => {
    try {
        const data = {
            month_name: req.body.month_name,
            from_date: req.body.from_date,
            to_date: req.body.to_date
        }
        await model.Dates.create(data).then((result) => {
            return res.status(200).json({ message: "Date Created Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to create date.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

deleteDate = async (req, res) => {
    try {
        const data = {
            id: req.body.id
        }
        await model.Dates.findByPk(data["id"]).then((result) => {
            if (result) {
                model.Dates.destroy({ where: { id: data["id"] } }).then((x) => {
                    return res.status(200).json({ message: "Date Deleted Successfully.", data: x });
                }).catch((err) => {
                    return res.status(500).json({ message: "Not able to delete date.", error: err });
                });
            } else {
                return res.status(500).json({ message: "Data Not Found." });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Please try again later.", error: err });
        });

    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

updateDate = async (req, res) => {
    try {
        const data = {
            id: req.body.id
        }
        const updateData = {
            month_name: req.body.month_name,
            from_date: req.body.from_date,
            to_date: req.body.to_date
        }
        await model.Dates.findByPk(data["id"]).then((result) => {
            if (result) {
                model.Dates.update(updateData, { where: { id: data["id"] } }).then((x) => {
                    return res.status(200).json({ message: "Date Updated Successfully.", data: x });
                }).catch((err) => {
                    return res.status(500).json({ message: "Not able to update date.", error: err });
                });
            } else {
                return res.status(500).json({ message: "Data Not Found." });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Please try again later.", error: err });
        });

    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getAllDate = async (req, res) => {
    try {
        await model.Dates.findAll().then((result) => {
            if (result) {
                return res.status(200).json({ message: "Date Fetched Successfully.", data: result });
            } else {
                return res.status(500).json({ message: "Data Not Found.", error: err });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Please try again later.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

getDate = async (req, res) => {
    try {
        const data = {
            id: req.body.id
        }
        await model.Dates.findByPk(data["id"]).then((result) => {
            if (result) {
                return res.status(200).json({ message: "Date Fetched Successfully.", data: result });
            } else {
                return res.status(500).json({ message: "Data Not Found.", error: err });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Please try again later.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}


module.exports = {
    createDate: createDate,
    deleteDate: deleteDate,
    updateDate: updateDate,
    getAllDate: getAllDate,
    getDate: getDate
}