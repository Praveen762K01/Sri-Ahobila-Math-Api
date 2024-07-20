const model = require('../models');

createAzagiyasingar = async (req, res) => {
    try {
        const data = {
            pattam_no: req.body.pattam_no,
            name: req.body.name,
            dob_tamil_month: req.body.dob_tamil_month,
            dob_tamil_star: req.body.dob_tamil_star,
            dob_english_date: req.body.dob_english_date,
            pattam_alive: req.body.pattam_alive,
            thirunakshatram: req.body.thirunakshatram,
            kainkaryam: req.body.kainkaryam,
            dod_tamil_month: req.body.dod_tamil_month,
            dod_english_date: req.body.dod_english_date,
            dod_paksham: req.body.dod_paksham,
            dod_thidhi: req.body.dod_thidhi,
            brindavan_location: req.body.brindavan_location,
            is_active: req.body.is_active,
            thirunakshatram_price: req.body.thirunakshatram_price,
            kainkaryam_price: req.body.kainkaryam_price,
            azagiyasingar_image:req.body.azagiyasingar_image
        }
        await model.AzagiyasingarMaster.create(data).then((result) => {
            return res.status(200).json({ message: "Azagiyasingar Created Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to create Azagiyasingar.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

deleteAzagiyasingar = async (req, res) => {
    try {
        const data = {
            id: req.body.id
        }
        await model.AzagiyasingarMaster.findOne({ where: { id: data["id"] } }).then((result) => {
            if (result) {
                model.AzagiyasingarMaster.destroy({ where: { id: data["id"] } }).then((x) => {
                    return res.status(200).json({ message: "Azagiyasingar Deleted Successfully" });
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

azagiyasingarList=async(req,res)=>{
    try {
        await model.AzagiyasingarMaster.findAll().then((result) => {
            if(result.length==0){
                return res.status(200).json({ message: "No data found."});
            }else{return res.status(200).json(result);}
            
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get data.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

updateAzagiyasingar = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            pattam_no: req.body.pattam_no,
            name: req.body.name,
            dob_tamil_month: req.body.dob_tamil_month,
            dob_tamil_star: req.body.dob_tamil_star,
            dob_english_date: req.body.dob_english_date,
            pattam_alive: req.body.pattam_alive,
            thirunakshatram: req.body.thirunakshatram,
            kainkaryam: req.body.kainkaryam,
            dod_tamil_month: req.body.dod_tamil_month,
            dod_english_date: req.body.dod_english_date,
            dod_paksham: req.body.dod_paksham,
            dod_thidhi: req.body.dod_thidhi,
            brindavan_location: req.body.brindavan_location,
            is_active: req.body.is_active
        }
        await model.AzagiyasingarMaster.update(data, {
            where: {
                id: data["id"]
            }
        }).then((result) => {
            return res.status(200).json({ message: "Azagiyasingar Updated Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to Edit Azagiyasingar.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

module.exports = {
    createAzagiyasingar: createAzagiyasingar,
    deleteAzagiyasingar: deleteAzagiyasingar,
    azagiyasingarList: azagiyasingarList,
    updateAzagiyasingar: updateAzagiyasingar
}