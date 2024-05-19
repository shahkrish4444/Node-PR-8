
const category = require("../Models/category.schema");
const extraCategory = require("../Models/extracategory.schema");
const product = require("../Models/product.schema");
const subCat = require("../Models/subCategory.schema");

const createProduct = async (req, res) => {
    console.log(req.body)
    const { title, price, description, catId, subCatId, extrCatId } = req.body;
    let data = await product.create({
        title: title,
        price: price,
        description: description,
        categoryID: catId,
        subCategoryId: subCatId,
        extraCategoryId: extrCatId
    }).then((data) => {
        console.log(data);
        res.redirect('/showproduct');
    }).catch((err) => {
        console.log(err);
        return false;
    })
}

const getProData = async (req, res) => {
    let data = await product.find().populate("categoryID").populate("subCategoryId").populate("extraCategoryId");

    res.send(data);
}

const proForm = async (req, res) => {
    let extaradata = await extraCategory.find().populate({
        path: "subCategoryId",
        populate: {
            path: "categoryId"
        }
    })
    res.render('Pages/product', { extaradata: extaradata });
}

const proHome = async (req, res) => {
    try {
        const data = await product.find({})
            .populate({
                path: "subCategoryId",
                populate: {
                    path: "categoryId"
                }
            })

        console.log("data    : " + data)
        res.render('Pages/showproduct', {
            data: data
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId, title, price, description, catId, subCatId, extrCatId } = req.body;
        await product.findByIdAndUpdate(productId, {
            title: title,
            price: price,
            description: description,
            categoryID: catId,
            subCategoryId: subCatId,
            extraCategoryId: extrCatId
        });
        res.redirect('/showproduct');
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}




module.exports = { createProduct, getProData, proForm, proHome, updateProduct }