const mongoose = require ('mongoose');

const categorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: { 
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

categorySchema.pre('sava', function(next) {
    this.updated_at = Date.now();
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;