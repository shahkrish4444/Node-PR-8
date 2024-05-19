const category = require("../Models/category.schema")

const create = async (req, res) => {
    try {
        
        const newCategory = new category(req.body);

        const result = await newCategory.save();

        console.log("Category saved successfully:", result);

        res.redirect('/');
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).send("Error saving category to the database");
    }
};

const update = async (req, res) => {
    let { id } = req.params;
    let cat = await category.findById(id);
    cat.subCategoryId = req.body.subId;
    cat.save();
    res.send(cat);
}

const getCat = async (req, res) => {
    let data = await category.find({})
    res.render('Pages/Category',{data:data});
}

module.exports = { create, update, getCat };