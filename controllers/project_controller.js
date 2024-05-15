const { where } = require('sequelize');
const model = require('../models');

getProject = async (req, res) => {
    try {
        await model.Projects.findAll().then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to get projects.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

createProject = async (req, res) => {
    try {
        const data = {
            name:req.body.name,
            description:req.body.description,
            date:req.body.date,
            price:req.body.price,
            image_one:req.body.image_one,
            image_two:req.body.image_two,
            is_active: req.body.is_active
        }
        await model.Projects.create(data).then((result) => {
            return res.status(200).json({ message: "Project Created Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to create project.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

updateProject = async (req, res) => {
    try {
        const data = {
            id:req.body.id,
            name:req.body.name,
            description:req.body.description,
            date:req.body.date,
            price:req.body.price,
            image_one:req.body.image_one,
            image_two:req.body.image_two,
            is_active: req.body.is_active
        }
        
        await model.Projects.update(data,{where:{id:data["id"]}}).then((result) => {
            return res.status(200).json({ message: "Project Updated Successfully." });
        }).catch((err) => {
            return res.status(500).json({ message: "Not able to update project.", error: err });
        });
    } catch (error) {
        return res.status(500).json({ message: "Something Went Wrong, Please try again later.", error: error });
    }
}

module.exports = {
    createProject: createProject,
    updateProject:updateProject,
    getProject:getProject
}