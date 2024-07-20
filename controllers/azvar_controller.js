const model = require('../models');

createAzvar = async (req, res) => {
    try {
        const data = {
            azvar: req.body.azvar,
            dob_tamil_month: req.body.dob_tamil_month,
            dob_tamil_star: req.body.dob_tamil_star,
            dob_english_date: req.body.dob_english_date,
            thirunakshatram: req.body.thirunakshatram,
            kainkaryam: req.body.kainkaryam,
            dod_tamil_month: req.body.dod_tamil_month,
            dod_english_date: req.body.dod_english_date,
            is_active: req.body.is_active,
            thirunakshatram_price: req.body.thirunakshatram_price,
            kainkaryam_price: req.body.kainkaryam_price,
            azvar_image:req.body.azvar_image
        }
        await model.AzvarMaster.create(data).then((result) => {
            return res.status(200).json({ message: "Azvar Created Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to create Azvar.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

deleteAzvar = async (req, res) => {
    try {
        const data = {
            id: req.body.id
        }
        await model.AzvarMaster.findOne({ where: { id: data["id"] } }).then((result) => {
            if (result) {
                model.AzvarMaster.destroy({ where: { id: data["id"] } }).then((x) => {
                    return res.status(200).json({ message: "Azvar Deleted Successfully" });
                }).catch((err) => {
                    return res.status(500).json({ message: "Not able to delete.", error: err });
                });
            } else {
                return res.status(500).json({ message: "Data Not found" });
            }
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to delete.", error: err });
        });

    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

azvarList = async (req, res) => {
    try {
        await model.AzvarMaster.findAll().then((result) => {
            if (result.length == 0) {
                return res.status(200).json({ message: "No data found." });
            } else { return res.status(200).json(result); }
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get data.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

updateAzvar = async (req, res) => {
    try {
        const data = {
            azvar: req.body.azvar,
            dob_tamil_month: req.body.dob_tamil_month,
            dob_tamil_star: req.body.dob_tamil_star,
            dob_english_date: req.body.dob_english_date,
            thirunakshatram: req.body.thirunakshatram,
            kainkaryam: req.body.kainkaryam,
            dod_tamil_month: req.body.dod_tamil_month,
            dod_english_date: req.body.dod_english_date,
            is_active: req.body.is_active
        }
        await model.AzvarMaster.update(data, {
            where: {
                id: data["id"]
            }
        }).then((result) => {
            return res.status(200).json({ message: "Azvar Updated Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to Edit Azvar.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

module.exports = {
    createAzvar: createAzvar,
    deleteAzvar: deleteAzvar,
    azvarList: azvarList,
    updateAzvar: updateAzvar
}