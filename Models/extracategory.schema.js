const mongoose = require('mongoose');

const extraCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory"
    }
}, { timestamps: true })

const extraCategory = mongoose.model('extracategory', extraCategorySchema);

module.exports = extraCategory;