
const category = require("../Models/category.schema");
const extraCategory = require("../Models/extracategory.schema");
const subCat = require("../Models/subCategory.schema");


const create = async (req, res) => {
    try {
        
        const newExtaraCategory = new extraCategory(req.body);

        const result = await newExtaraCategory.save();

        console.log("Extara Category saved successfully:", result);

        res.redirect('/');
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).send("Error saving category to the database");
    }
}

const getExtra = async (req, res) => {
    
    let extaradata = await extraCategory.find().populate({
        path: "subCategoryId",
        populate: {
            path:"categoryId"
        }
    })   
    console.log(extaradata) 
    let subdata = await subCat.find({})

    res.render('Pages/extracategory',{extaradata:extaradata,subdata:subdata});
}

module.exports = { create, getExtra };